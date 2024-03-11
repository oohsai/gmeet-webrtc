let localStream;
let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    { url: ["stun3.l.google.com:19302", "stun4.l.google.com:19302"] },
  ],
};

let init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  document.getElementById("user-1").srcObject = localStream;
  createOffer();
};

let createOffer = async () => {
  peerConnection = new RTCPeerConnection(servers);
  remoteStream = new MediaStream();
  document.getElementById("user-2").srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTra(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack();
    });

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("New ICE candidate:", event.candidate);
      }
    };
  };

  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log("offer : ", offer);
};

init();
