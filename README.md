# ddss_demo

1. **backend**: https://glitch.com/~ddss-demo
2. **mobile app**: https://snack.expo.io/@jose-donato/e7e8ab
 
### **motivation**
"security is often overlooked"
"100% secure apps does not exist" why?
- 0 day vulns
- someone more clever will always find a breach -> as a teacher said to me before (prof. Marco): "Nothing is impossible, it is just a little bit harder"

### **our duty and responsability as developers**
![effort vs security](https://reactnative.dev/docs/assets/d_security_chart.svg)

- following the best practices depending on which framework we are using or which environments are we tarking. mobile apps we need to have some considerations. if we are developing mobile apps, the concerns we need to have in mind are different when developing apps for industrial control systems, for example. our focus in this article is mobile apps so i will shift my focus into that from now on.
- we have a duty when developing applications that is nowadays more mandatory due to GDPR (before was more a moral duty - https://www.computer.org/education/code-of-ethics). 
- as we can see in the graphic, the more effort invested in security the less likely our app will get breached. following the best practices is the first way to develop an application that will keep away the majority of the hackers.

### **react native and expo**

react native: framework that allow us to develop applications for iOS and Android from a single codebase.
expo: tries to take it to the next level introducing another level of abstraction and aims to produce outputs for iOS, Android, Linux, Windows and Web from the almost exact same codebase.

### **practices**

1. storing sensitive info
- Anything included in the code can be accessed in plain text by inspecting the app bundle as we will see in a minute. So, we cannot store in any time sensitive API KEYs or other secrets in our application. solution? Develop a backend that we control and we can call whenever we want. In this backend we store the API KEYS safely away from the "bad guys". 

- Of course we need in some usecases to save data data. Imagine an offline game, we need to save the player progress somewhere in the user's devices. When saving data persistently, we allow our application to grab the data layer without the need of network requests. In React Native we have a community-maintained package that is widely used (2k github stars and 276,852 weekly downloads in npm) for this purpose. Despite being in its own sandbox environment (meaning it is not shared between apps), it is not meant to use to save authentication tokens or other secrets. For web developers, Async Storage can be easily compared to Local Storage. Why is not secure? Just looking at the docs "AsyncStorage is a simple, unencrypted, asynchronous, persistent, key-value storage system that is global to the app.". Expo offers an alternative that although it is not available on the web, it is available for both iOS and Android devices - **SecureStore** (https://docs.expo.io/versions/latest/sdk/securestore/).

2. network security
all API calls must use SSL encryption meaning that all the data in transit will be encrypted from the point it leaves the server to the point it reaches the client. The easy way to make sure the endpoint is secure is to watch at the protocol in the beggining:

![url](https://cdn.ttgtmedia.com/rms/onlineimages/networking-basic_url_structure.png)

If it starts with `https://` it means we should be fine. If it starts with `http://` it does not support and we should not call that endpoint.


### **demo**