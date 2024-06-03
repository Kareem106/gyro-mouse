const btn = document.getElementById("socket-btn");
const socket_ip = document.getElementById("socket-ip");
const socket_port = document.getElementById("socket-port");
let socket;
const socket_connect = () => {
  const [ip, port] = [socket_ip.value, socket_port.value];
  if (ip && port) {
    socket = new WebSocket(`ws://${ip}:${port}`);
    socket.onopen = () => {
      console.log("connected");
    };
    socket.onclose = () => {
      console.log("disconnected");
    };
    socket.addEventListener("message", (event) => {
      console.log(event.data);
    });

    // Get the acceleration data
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        (event) => {
          socket.send(
            JSON.stringify({ x: event.beta, y: event.gamma, z: event.alpha })
          );
          document.getElementById("x").innerHTML = event.beta;
          document.getElementById("y").innerHTML = event.gamma;
          document.getElementById("z").innerHTML = event.alpha;
        },
        true
      );
    }
  } else {
    alert("invalid ip or port");
  }
};
btn.addEventListener("click", (e) => {
  console.log("clicked");
  if (btn.classList.contains("enabled")) {
    btn.classList.remove("enabled");
    btn.innerText = "Start";
    socket.close();
  } else {
    btn.classList.add("enabled");
    btn.innerText = "Stop";
    socket_connect();
  }
});
