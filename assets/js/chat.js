document.addEventListener("DOMContentLoaded", function () {
  //widget chat
  const chatIcon = document.createElement("div");
  chatIcon.id = "chat-icon";
  chatIcon.style.position = "fixed";
  chatIcon.style.bottom = "20px";
  chatIcon.style.right = "20px";
  chatIcon.style.width = "75px";
  chatIcon.style.height = "78px";
  chatIcon.style.borderRadius = "4px";
  chatIcon.style.backgroundColor = "#007acc";
  chatIcon.style.display = "flex";
  chatIcon.style.flexDirection = "column";
  chatIcon.style.justifyContent = "center";
  chatIcon.style.alignItems = "center";
  chatIcon.style.color = "#fff";
  chatIcon.style.cursor = "pointer";
  chatIcon.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";

  const iconImage = document.createElement("img");
  iconImage.src = "/assets/images/logo.png";
  iconImage.alt = "AI chat icon";
  iconImage.style.width = "30px";
  iconImage.style.height = "40px";

  const iconText = document.createElement("span");
  iconText.innerText = "Ask AI";
  iconText.style.marginTop = "5px";
  iconText.style.fontFamily = "Arial, sans-serif";
  iconText.style.fontSize = "17px";
  iconText.style.fontWeight = "bold";
  iconText.style.color = "#fff";

  chatIcon.appendChild(iconImage);
  chatIcon.appendChild(iconText);

  document.body.appendChild(chatIcon);

  //Chatbox
  const chatbox = document.createElement("div");
  chatbox.id = "chatbox";
  chatbox.style.position = "fixed";
  chatbox.style.bottom = "80px";
  chatbox.style.right = "50px";
  chatbox.style.width = "300px";
  chatbox.style.height = "400px";
  chatbox.style.backgroundColor = "#fff";
  chatbox.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  chatbox.style.display = "none";
  chatbox.style.flexDirection = "column";
  chatbox.style.borderRadius = "5px";
  document.body.appendChild(chatbox);

  //Header chatbox
  const chatHeader = document.createElement("div");
  chatHeader.style.padding = "8px";
  chatHeader.style.backgroundColor = "#007acc";
  chatHeader.style.color = "#fff";
  chatHeader.style.textAlign = "center";
  chatHeader.style.display = "flex";
  chatHeader.style.alignItems = "center";
  chatHeader.style.borderTopLeftRadius = "5px";
  chatHeader.style.borderTopRightRadius = "5px";

  const headerImage = document.createElement("img");
  headerImage.src = "/assets/images/logo.png";
  headerImage.style.width = "23px";
  headerImage.style.height = "30px";
  headerImage.style.marginRight = "15px";

  const headerText = document.createElement("span");
  headerText.innerText = "SVUIT - MMTT AI";
  headerText.style.fontFamily = "Arial, sans-serif";
  headerText.style.fontWeight = "bold";
  headerText.style.fontSize = "20px";

  const closeButton = document.createElement("button");
  closeButton.innerText = "×";
  closeButton.style.marginLeft = "auto";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.color = "#bbbbbb";
  closeButton.style.fontSize = "20px";
  closeButton.style.cursor = "pointer";
  closeButton.style.display = "flex";
  closeButton.style.opacity = "0.5";

  closeButton.addEventListener("mouseover", function () {
    closeButton.style.opacity = "1";
    closeButton.style.backgroundColor = "#eeeeee";
  });

  closeButton.addEventListener("mouseout", function () {
    closeButton.style.opacity = "0.5";
    closeButton.style.backgroundColor = "transparent";
  });

  closeButton.addEventListener("click", function () {
    chatbox.style.display = "none";
  });

  chatHeader.appendChild(headerImage);
  chatHeader.appendChild(headerText);
  chatHeader.appendChild(closeButton);
  chatbox.appendChild(chatHeader);

  const chatMessages = document.createElement("div");
  chatMessages.style.flex = "1";
  chatMessages.style.padding = "10px";
  chatMessages.style.overflowY = "auto";
  chatbox.appendChild(chatMessages);

  const chatInputWrapper = document.createElement("div");
  chatInputWrapper.style.display = "flex";
  chatInputWrapper.style.padding = "1px";
  chatInputWrapper.style.border = "1px solid #0000ff";
  chatInputWrapper.style.borderRadius = "10px";
  chatInputWrapper.style.marginBottom = "10px";
  chatInputWrapper.style.marginLeft = "10px";
  chatInputWrapper.style.marginRight = "10px";
  chatbox.appendChild(chatInputWrapper);

  const chatInput = document.createElement("input");
  chatInput.type = "text";
  chatInput.style.flex = "1";
  chatInput.style.padding = "10px";
  chatInput.style.backgroundColor = "#fff";
  chatInput.style.color = "#000";
  chatInput.style.border = "none";
  chatInput.style.borderTopLeftRadius = "10px";
  chatInput.style.borderBottomLeftRadius = "10px";
  chatInput.style.outline = "none";
  chatInput.placeholder = "Đặt câu hỏi ...";
  chatInputWrapper.appendChild(chatInput);

  const chatButton = document.createElement("button");
  chatButton.innerText = "➙";
  chatButton.style.width = "30px";
  chatButton.style.height = "30px";
  chatButton.style.backgroundColor = "#007acc";
  chatButton.style.color = "#fff";
  chatButton.style.border = "none";
  chatButton.style.cursor = "pointer";
  chatButton.style.borderRadius = "8px";
  chatButton.style.fontSize = "20px";
  chatButton.style.marginRight = "5px";
  chatButton.style.marginTop = "5px";
  chatButton.style.marginBottom = "5px";
  chatInputWrapper.appendChild(chatButton);

  chatButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  chatIcon.addEventListener("click", async function () {
    chatbox.style.display = chatbox.style.display === "none" ? "flex" : "none";

    
    await scaleDockerService();

    const aiMessageElem = document.createElement("div");
    aiMessageElem.style.marginBottom = "10px";
    aiMessageElem.style.padding = "10px";
    aiMessageElem.innerText = "Docker service created.";
    aiMessageElem.style.color = "#000";
    chatMessages.appendChild(aiMessageElem);

    const separator = document.createElement("hr");
    separator.style.border = "none";
    separator.style.borderTop = "1px solid #333";
    separator.style.margin = "10px 0";
    chatMessages.appendChild(separator);
  });

  //Message
  function sendMessage() {
    const userMessage = chatInput.value;
    if (userMessage.trim()) {
      const userMessageElem = document.createElement("div");
      userMessageElem.style.marginBottom = "10px";
      userMessageElem.style.padding = "10px";
      userMessageElem.innerText = userMessage;
      userMessageElem.style.color = "#000";
      userMessageElem.style.fontWeight = "bold";
      chatMessages.appendChild(userMessageElem);
      chatInput.value = "";

      const aiMessageElem = document.createElement("div");
      aiMessageElem.style.marginBottom = "10px";
      aiMessageElem.style.padding = "10px";
      aiMessageElem.innerText = "response from AI.";
      aiMessageElem.style.color = "#000";
      chatMessages.appendChild(aiMessageElem);

      const separator = document.createElement("hr");
      separator.style.border = "none";
      separator.style.borderTop = "1px solid #333";
      separator.style.margin = "10px 0";
      chatMessages.appendChild(separator);
    }
  }
  async function scaleDockerService() {
    try {
      // Fetch service info to get the current version index
      const response = await fetch('http://localhost/v1.45/services/r9gbzjsmunpc4wrq17au9yb9t', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const request2 = response.clone();
      if (!resquest2.ok) {
        throw new Error('Network response was not ok');
      }
  
      const serviceInfo = await response.json();
      const version = serviceInfo.Version.Index;
  
      // Scale the service by updating the number of replicas
      const updateResponse = await fetch(`http://localhost/v1.45/services/1j0hr7u99lnp /update?version=${version}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: "service-svuit-image",
          TaskTemplate: {
            ContainerSpec: {
              Image: "svuit:latest",
            },
          },
          Mode: {
            Replicated: {
              Replicas: 1,
            },
          },
          EndpointSpec: {
            Mode: "vip",
          },
        }),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Docker service scaled successfully');
    } catch (error) {
      console.error(`Error scaling Docker service: ${error}`);
    }
  }  
});