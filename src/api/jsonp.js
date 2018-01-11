/**
 * Created by shizw on 2018/1/11.
 */
'use strict';
function getScript(url, data) {
  let script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  return new Promise((resolve, reject) => {
    script.onload = () => {
      resolve();
    };
  });
};

export default getScript;
