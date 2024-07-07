function displayLoginButtons() {
    if (location.href.toLowerCase().includes('www.odoo.com')) return;
    
    const template = `
        <div class="form-group mb-2 text-center">
            <div class="small mb-1">Login as</div>
                <div class="btn-group btn-group-sm ou-login-buttons">
                <a href="#" class="btn btn-primary" data-username="admin" title="Login as admin user">Admin</a>
                <a href="#" class="btn btn-primary" data-username="demo" title="Login as demo user">Demo</a>
                <a href="#" class="btn btn-primary" data-username="portal" title="Login as portal user">Portal</a>
            </div>
        </div>
    `;

    
    // Append useful Admin/Demo/Portal buttons at the form's top
    const form = document.querySelector('.oe_login_form');
    form?.insertAdjacentHTML('afterbegin', template);
    
    
    // Add event listeners to all buttons
    const loginButtons = form.querySelectorAll('.ou-login-buttons a');
    const usernameInput = form.querySelector('input[name="login"]');
    const passwordInput = form.querySelector('input[name="password"]');
    
    for (const button of loginButtons) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const value = this.dataset.username;
            if (value) {
                usernameInput.value = value;
                passwordInput.value = value;
            }

            form.submit();
        });
    }
}

// Append useful buttons to login page
displayLoginButtons();
