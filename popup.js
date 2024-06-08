document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('downloadimage').addEventListener('click', function() {
      chrome.tabs.query({
          active: true,
          currentWindow: true
      }, function(tabs) {
          chrome.scripting.executeScript({
              target: {
                  tabId: tabs[0].id
              },
              function: takeScreenshot
          });
      });
  });
});

function takeScreenshot() {
  const videoElement = document.querySelector('video');
  if (videoElement) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'screenshot.png';
      link.click();
  } else {
      alert('No video found on this page.');
  }
}