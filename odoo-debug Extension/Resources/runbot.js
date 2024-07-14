browser.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.action === 'getRunbotLoggedUser') {
        sendResponse({
            action: 'setRunbotLoggedUser',
            user: document.querySelector('#top_menu li a[data-bs-toggle="dropdown"] b span')
                    ?.textContent
                    .split('(')[1]
                    .split(')')[0]
                || null,
        });
    }
});
