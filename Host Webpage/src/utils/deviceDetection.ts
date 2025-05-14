export const getOSDetails = () => {
  const userAgent = window.navigator.userAgent;
  let os = null;
  let osVersion = null;

  // Detect Windows
  if (userAgent.indexOf("Windows") !== -1) {
    os = "Windows";
    
    if (userAgent.indexOf("Windows NT 10.0") !== -1) {
      osVersion = "10";
    } else if (userAgent.indexOf("Windows NT 6.3") !== -1) {
      osVersion = "8.1";
    } else if (userAgent.indexOf("Windows NT 6.2") !== -1) {
      osVersion = "8";
    } else if (userAgent.indexOf("Windows NT 6.1") !== -1) {
      osVersion = "7";
    }
  } 
  // Detect Android
  else if (userAgent.indexOf("Android") !== -1) {
    os = "Android";
    const match = userAgent.match(/Android\s([0-9\.]*)/);
    if (match) {
      osVersion = match[1];
    }
  }
  // Detect iOS devices
  else if (/iPad|iPhone|iPod/.test(userAgent)) {
    os = "iOS";
    if (userAgent.indexOf("OS ") !== -1) {
      osVersion = userAgent
        .split("OS ")[1]
        .split(" ")[0]
        .replace(/_/g, ".");
    }
  }
  // Detect macOS
  else if (userAgent.indexOf("Mac OS X") !== -1) {
    os = "macOS";
    const match = userAgent.match(/Mac OS X ([0-9_\.]*)/);
    if (match) {
      osVersion = match[1].replace(/_/g, ".");
    }
  }
  // Detect Linux
  else if (userAgent.indexOf("Linux") !== -1) {
    os = "Linux";
  }

  return {
    os,
    osVersion,
    userAgent,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
  };
};