browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getRunbotLoggedUser') {
        const user = document.querySelector('#top_menu li a[data-bs-toggle="dropdown"] b span');
        if (user) {
            sendResponse({ action: 'setRunbotLoggedUser', user: user.textContent.trim() });
        }
    }
});
