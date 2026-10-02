let isActive = true;

function toggleTab() {
    isActive = !isActive;
    updateTabUI();

    // Envia a interação para o script .lua do FiveM
    if (window.GetParentResourceName) {
        fetch(`https://${GetParentResourceName()}/tabClick`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ active: isActive })
        });
    }
}

function updateTabUI() {
    const tabBtn = document.getElementById('tabBtn');
    if (isActive) {
        tabBtn.classList.remove('inactive');
    } else {
        tabBtn.classList.add('inactive');
    }
}

// Ouvinte para alternar o estado via Lua no FiveM
window.addEventListener('message', function(event) {
    if (event.data.action === "setActive") {
        isActive = event.data.status;
        updateTabUI();
    }
});
