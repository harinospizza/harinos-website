
export const NotificationService = {
  requestPermission: async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return false;
    }

    if (Notification.permission === 'granted') return true;

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  },

  show: (title: string, body: string, icon?: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: icon || 'https://drive.google.com/thumbnail?id=1Gz7Qi82EYLJZxm1EfFxpXHHQ6mhKQIc4&sz=w500',
        badge: 'https://drive.google.com/thumbnail?id=1Gz7Qi82EYLJZxm1EfFxpXHHQ6mhKQIc4&sz=w500'
      });
    }
  },

  simulateOrderStatus: (orderId: string, type: 'takeaway' | 'delivery') => {
    // Stage 1: Received (Immediate)
    setTimeout(() => {
      NotificationService.show(
        "Order Confirmed! 🍕",
        `We've received your order ${orderId}. The chef is washing their hands right now!`
      );
    }, 1000);

    // Stage 2: Preparing
    setTimeout(() => {
      NotificationService.show(
        "In the Oven! 🔥",
        `Order ${orderId} is being baked to perfection. Smells amazing!`
      );
    }, 15000);

    // Stage 3: Ready / Out for Delivery
    setTimeout(() => {
      const msg = type === 'delivery' 
        ? "Out for Delivery! 🛵" 
        : "Ready for Pickup! 🥡";
      const body = type === 'delivery'
        ? "Our partner is on the way to your location. Get the plates ready!"
        : "Your order is hot and waiting at the counter. See you soon!";
      
      NotificationService.show(msg, body);
    }, 45000);
  },

  sendSpecialOffer: () => {
    NotificationService.show(
      "Mid-Day Craving? 😋",
      "Get a FREE Choco-Lava cake on orders above ₹300! Limited time offer. BECAUSE HARI KNOWS."
    );
  }
};
