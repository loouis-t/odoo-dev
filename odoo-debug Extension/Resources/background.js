class ClickHandler {
    constructor() {
        this.clickTimeout = null;
        browser.action.onClicked.addListener(this.handleClick.bind(this));
    }

    handleMessage(request) {
        if (request.action === 'setRunbotLoggedUser') {
            this.updateParam('search', `-${request.user}`)
            this.updateTabUrl(request.tabId)
        }
    }

    handleClick(tab) {
        this.currentUrl = new URL(tab.url); // Store current URL as a class property

        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;
            this.handleDoubleClick(tab);
        } else {
            this.clickTimeout = setTimeout(() => {
                this.handleSingleClick(tab);
                this.clickTimeout = null;
            }, 250); // Adjust timeout for distinguishing clicks
        }
    }

    handleSingleClick(tab) {
        switch (this.currentUrl.hostname) {
            case 'github.com':
                if (this.currentUrl.pathname.endsWith('/pulls')) {
                    this.currentUrl.pathname += '/@me';
                }
                break;
            case 'runbot.odoo.com':
                browser.tabs.sendMessage(tab.id, { action: 'getRunbotLoggedUser' }, this.handleMessage.bind(this));
                break;
            default:
                this.updateParam('debug', '1');
                break;
        }
        this.updateTabUrl(tab.id);
    }

    handleDoubleClick(tab) {
        this.updateParam('debug', 'assets', true);
        this.updateTabUrl(tab.id);
    }

    /**
     * Update url params
     *
     * @param param e.g. 'debug'
     * @param value e.g. 'assets'
     * @param force force the update even if the param is already set
     */
    updateParam(param, value, force = false) {
        const params = new URLSearchParams(this.currentUrl.search);
        if (!params.has(param) || force) {
            params.set(param, value);
            this.updateIcon(value);
        } else {
            params.delete(param);
            this.updateIcon();
        }
        this.currentUrl.search = `?${params.toString()}`;
    }

    /**
     * Changes the toolbar icon
     *
     * @param mode could be '1' or 'assets'
     */
    updateIcon(mode) {
        let icon;
        if (mode === '1') {
            icon = 'on';
        } else if (mode === 'assets') {
            icon = 'super';
        } else {
            icon = 'off';
        }

        browser.action.setIcon({
            path: {
                "48": `images/${icon}-48.png`,
                "64": `images/${icon}-64.png`
            }
        });
    }

    updateTabUrl(tabId) {
        const url = this.currentUrl.origin + this.currentUrl.pathname + this.currentUrl.search + this.currentUrl.hash;
        browser.tabs.update(tabId, { url });
    }
}

// Initialize the click handler
new ClickHandler();

