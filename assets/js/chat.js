<<<<<<< HEAD
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
      const serviceInfoResponse = await fetch('http://34.143.174.184:2375/v1.41/services/r9gbzjsmunpc4wrq17au9yb9t', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!serviceInfoResponse.ok) {
        throw new Error('Failed to fetch service info');
      }
  
      const serviceInfo = await serviceInfoResponse.json();
      const version = serviceInfo.Version.Index;
  
      // Scale the service by updating the number of replicas
      const response = await fetch(`http://34.143.174.184:2375/v1.41/services/r9gbzjsmunpc4wrq17au9yb9t/update?version=${version}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: serviceInfo.Spec.Name,
          TaskTemplate: {
            ContainerSpec: serviceInfo.Spec.TaskTemplate.ContainerSpec,
            ForceUpdate: serviceInfo.Spec.TaskTemplate.ForceUpdate,
            Runtime: serviceInfo.Spec.TaskTemplate.Runtime,
          },
          Mode: {
            Replicated: {
              Replicas: 1
            }
          },
          EndpointSpec: serviceInfo.Spec.EndpointSpec
        })
      });
  
      if (response.ok) {
        console.log('Docker service scaled successfully');
      } else {
        console.error('Failed to scale Docker service', response.statusText);
      }
    } catch (error) {
      console.error('Error scaling Docker service', error);
    }
  }
  
});
=======
document.addEventListener("DOMContentLoaded", function () {
    // Create chat icon
  const chatIcon = document.createElement('div');
  chatIcon.id = 'chat-icon';
  chatIcon.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 75px;
    height: 78px;
    border-radius: 4px;
    background-color: #523AF0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 5px 0; 
    `;

const iconImage = document.createElement('img');
iconImage.src = '/assets/images/chatbot.png';
iconImage.alt = 'AI chat icon';
iconImage.style = `
  width: 53px; 
  height: 55px; 
  `;

const iconText = document.createElement('span');
iconText.innerText = 'Ask AI';
iconText.style = `
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  line-height: 1;
  margin-top: -3px; 
`;

chatIcon.appendChild(iconImage);
chatIcon.appendChild(iconText);
document.body.appendChild(chatIcon);
  
// Create overlay
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 999;
  `;
document.body.appendChild(overlay);
  
    // Create chatbox
const chatbox = document.createElement('div');
chatbox.id = 'chatbox';
chatbox.style = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 700px;
      height: 300px;
      max-height: 80vh;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: none;
      flex-direction: column;
      border-radius: 5px;
      z-index: 1000;
      overflow: hidden;
    `;
    document.body.appendChild(chatbox);
  
    // Create chatbox header
    const chatHeader = document.createElement('div');
    chatHeader.style = `
      padding: 13px;
      background-color:#523AF0;
      color: #fff;
      text-align: center;
      display: flex;
      align-items: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    `;
  
    const headerText = document.createElement('span');
    headerText.innerText = 'SVUIT - MMTT AI CHAT';
    headerText.style = `
      font-family: Arial, sans-serif;
      font-weight: bold;
      font-size: 25px;
      margin-left: 10px;
    `;
  
    const closeButton = document.createElement('button');
    closeButton.innerText = '×';
    closeButton.style = `
      margin-left: auto;
      background-color: transparent;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 25px;
      cursor: pointer;
      display: flex;
    `;
  
    closeButton.addEventListener('click', function () {
      chatbox.style.display = 'none';
      overlay.style.display = 'none';
      resetChatboxHeight();
    });
  
    overlay.addEventListener('click', function () {
      chatbox.style.display = 'none';
      overlay.style.display = 'none';
      resetChatboxHeight();
    });
  
    chatHeader.appendChild(headerText);
    chatHeader.appendChild(closeButton);
    chatbox.appendChild(chatHeader);
  
    // Create chat messages container
    const chatMessages = document.createElement('div');
    chatMessages.style = `
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `;
    chatbox.appendChild(chatMessages);
  
    // Add a note to the chatbox #FFFFCC
    const note = document.createElement('div');
    note.innerText = 'This is a custom LLM for answering questions about Docker. Answers are based on the contents of the documentation. This feature is experimental - rate the answers to let us know what you think!';
    note.style = `
      background-color: #FFFFCC;
      color: #000;
      padding: 10px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      margin-bottom: 10px;
      width: 100%; 
      text-align: left;
      display: block;
      z-index: 1000;
    `;
    chatMessages.appendChild(note);
  
    // Create chat input wrapper
    const chatInputWrapper = document.createElement('div');
    chatInputWrapper.style = `
      display: flex;
      align-items: center;
      padding: 5px;
      border: 1px solid #523AF0;
      border-radius: 15px;
      margin: 10px;
    `;
    chatbox.appendChild(chatInputWrapper);
  
    // Create chat input
    const chatInput = document.createElement('textarea');
    chatInput.style = `
      flex: 1;
      padding: 10px;
      height: 20px; /* Allow height to adjust based on content */
      background-color: #fff;
      color: #000;
      border: none;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      outline: none;
      resize: none;
      overflow: hidden;
      line-height: 16px;
      max-height: 100px; /* Adjust to fit within container */
      box-sizing: border-box;
    `;
    chatInputWrapper.appendChild(chatInput);
    chatInput.placeholder = 'Ask AI';
  
    // Create chat button
    const chatButton = document.createElement('button');
    chatButton.innerText = '➙';
    chatButton.style = `
      width: 30px;
      height: 30px;
      background-color: #523AF0;
      color: #fff;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      font-size: 20px;
      margin: 5px;
    `;
    chatInputWrapper.appendChild(chatButton);
  
    // Add event listeners for sending messages
    chatButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
  
    chatIcon.addEventListener('click', function () {
      chatbox.style.display = chatbox.style.display === 'none' ? 'flex' : 'none';
      overlay.style.display = chatbox.style.display === 'none' ? 'none' : 'block';
      if (chatbox.style.display === 'flex') {
        resetChatboxHeight();
        setTimeout(() => chatInput.focus(), 0); // Focus on input when chatbox opens
      }
    });
  
    // Function to send message
    function sendMessage() {
      const userMessage = chatInput.value;
      if (userMessage.trim()) {
        // Display user's message
        const userMessageElem = document.createElement('div');
        userMessageElem.style = `
          display: inline-block;
          max-width: 90%;
          margin-bottom: 10px;
          padding: 10px;
          color: #fff;
          font-weight: bold;
          background-color: #6B68EE;
          border-radius: 20px;
          word-break: break-word;
          font-size: 15px;
          text-align: left;
          align-self: flex-end;
          z-index: 1000;
        `;
        userMessageElem.innerText = userMessage;
        chatMessages.appendChild(userMessageElem);
        chatInput.value = '';
  
        chatInput.style.height = '20px';
        adjustChatboxHeight();
  
        // Display AI's response
        const aiMessageElem = document.createElement('div');
        aiMessageElem.style = `
          display: inline-block;
          max-width: 90%;
          margin-bottom: 10px;
          padding: 10px;
          color: #000;
          background-color: #D3D3D3;
          border-radius: 20px;
          font-size: 15px;
          text-align: left;
          word-break: break-word;
          z-index: 1000;
        `;
        const markdownResponse = `**Tóm tắt mục tiêu khóa học Quản lý thông tin**\n\n**Mục tiêu khóa học:**\n* Hiểu các kiến thức về quy trình tổ chức, biểu diễn và lưu trữ thông tin. \n* Biết, hiểu và vận dụng các kiến thức về các kỹ thuật xử lý thông tin gồm: truy vấn, an toàn và lập trình CSDL. \n* Hiểu và đánh giá được các mô hình CSDL tiên tiến trong thực tế: CSDL hướng đối tượng, CSDL phi quan hệ, và CSDL di động.`;
        aiMessageElem.innerHTML = marked.parse(markdownResponse);
        chatMessages.appendChild(aiMessageElem);;
  
        const buttonContainer = document.createElement('div');
        buttonContainer.style = `
          display: flex;
          gap: 1px;
          margin-top: 1px;
          margin-left: 10px;
          z-index: 1000;
        `;
  
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fa fa-copy"></i>';
        copyButton.style = `
          background-color: #e8e8e8;
          color: #696969;
          border: none;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 5px;
          margin-top: 5px;
          font-size: 12px;
          font-family: Arial, sans-serif;
          margin-left: 5px;
        `;
  
        copyButton.addEventListener('click', function () {
          const messageToCopy = aiMessageElem.innerText.replace('Copy', '').trim();
          navigator.clipboard.writeText(messageToCopy)
        });
  
        const refreshButton = document.createElement('button');
        refreshButton.innerHTML = '<i class="fa fa-refresh"></i>';
        refreshButton.style = `
          background-color: #e8e8e8;
          color: #696969;
          border: none;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 5px;
          margin-top: 5px;
          font-size: 12px;
          font-family: Arial, sans-serif;
          margin-left: 5px;
        `;
  
        refreshButton.addEventListener('click', function () {
          // Logic to refresh the AI message
          aiMessageElem.innerText = 'updated response from AI.';
        });
  
        buttonContainer.appendChild(copyButton);
        buttonContainer.appendChild(refreshButton);
        chatMessages.appendChild(buttonContainer);
  
        const separator = document.createElement('hr');
        separator.style = `
          border: none;
          border-top: 1px solid #333; 
          margin: 10px 0;
          width: 100%;
        `;
        chatMessages.appendChild(separator);
  
        chatMessages.scrollTop = chatMessages.scrollHeight;
  
        adjustChatboxHeight();
      }
    }
  
    // Custom scrollbar styling
    const style = document.createElement('style');
    style.innerHTML = `
      #chatbox ::-webkit-scrollbar {
        width: 12px;
      }
      #chatbox ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      #chatbox ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
      }
      #chatbox ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      #chatbox {
        scrollbar-width: thin;
        scrollbar-color: #888 #f1f1f1;
      }
    `;
    document.head.appendChild(style);
  
    function adjustChatboxHeight() {
      chatInput.style.height = '20px'; 
      chatInput.style.height = chatInput.scrollHeight + 'px';
  
      const chatContentHeight = chatMessages.scrollHeight;
      const chatInputHeight = chatInput.scrollHeight;
      const chatInputWrapperHeight = chatInputWrapper.offsetHeight;
      const chatHeaderHeight = chatHeader.offsetHeight;
      const minChatboxHeight = 300; 
      const maxChatboxHeight = window.innerHeight * 0.8; 
  
      const newChatboxHeight = Math.min(
        Math.max(minChatboxHeight, chatContentHeight + chatInputWrapperHeight + chatHeaderHeight),
        maxChatboxHeight
      );
  
      chatbox.style.height = newChatboxHeight + 'px';
      chatMessages.style.maxHeight = (newChatboxHeight - chatInputWrapperHeight - chatHeaderHeight) + 'px';
    }
  
    function resetChatboxHeight() {
      if (chatMessages.children.length === 1) { // Only the note exists
        chatbox.style.height = '300px'; 
        chatMessages.style.maxHeight = '200px'; 
      }
      chatInput.style.height = '20px';
    }
  
    chatInput.addEventListener('input', function () {
      if (chatInput.value.trim() === '') {
        resetChatboxHeight();
      } else {
        adjustChatboxHeight();
      }
    });

    chatInput.addEventListener('focus', function () {
      adjustChatboxHeight();
    });
  });




>>>>>>> 43a81c4612aaa4f30577499d59d446c4e5039e88
