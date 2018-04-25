self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }

    console.log('Notification Recieved:');
    console.log(data);
    self.agentId = data.agentId;
    var title = data.title;
    var message = data.message;
    var icon = "assets/images/logoOSS.png";

    event.waitUntil(self.registration.showNotification(title, {
        body: message
    }));
});

self.addEventListener('notificationclick', function (event) {
    console.log(event);
    let url = 'https://ng-killer.azurewebsites.net/agent/'+self.agentId;
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
