//  "bench-press": {
//             "title": "Bench press",
//             "description": "...",
//             "link": "http://youtu.be/bbGuHx07EDc"
//           },
//           "rowing": {
//             "title": "Rowing",
//             "description": "...",
//             "link": "http://youtu.be/Nxr4-9ZXRBw"
//           },
//           "side-raises": {
//             "title": "Side raises",
//             "description": "",
//             "link": "http://youtu.be/wzbX9cDlGDs"
//           }

const arr = ["bench-press", "rowing", "side-raises"];
arr.map((ex, index) => {
  return (
    <div>
      <span>{t(`${ex}.title`)}</span>
      <div>{t(`${ex}.description`)}</div>
    </div>
  );
});
