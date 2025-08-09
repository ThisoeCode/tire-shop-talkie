console.log('[Thisoe] ACME TIRE notification SW running...')

self.addEventListener('notificationclick',e=>{
  e.notification.close()

  const toOpen = 'https:// ACME TIRE DOMAIN /admin/accountance'

  // Focus window
  e.waitUntil(
    clients.matchAll({type:'window'}).then(clientList=>{
      for(let client of clientList){
        if(client.url===toOpen && 'focus' in client)
          return client.focus()
      }
      // no window: open new
      if(clients.openWindow)
        return clients.openWindow(toOpen)
    })
  )
})

self.addEventListener('message',async e=>{
  if(e.data && e.data.type === 'show-notification'){
    const{carid,ttl}=e.data;
    ( // close existing
      await self.registration.getNotifications({tag:'new_bill'})
    ).forEach(n=>n.close())
    // Show the new notification
    self.registration.showNotification('새로운 계산서가 수신되었습니다.',{
      icon:'../public/favicon.ico',
      body:`[${carid}호] 총${ttl}원`,
      tag:'new_bill',
    })
  }
})