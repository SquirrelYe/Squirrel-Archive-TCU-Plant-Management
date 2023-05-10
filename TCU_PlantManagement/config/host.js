let plat = "mas"; // dev.开发环境，master.正式环境
let host;

if (plat === "mas") {
  plat = "mas";
  host = "https://tree.aesen.cc/api/";
} else {
  plat = "dev";
  host = "http://localhost:10000/";
}

console.warn("当前运行环境为:", plat, "\n指向服务器host地址为:", host);
module.exports = host;
