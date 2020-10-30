//Beendung der Session
fetch("/logout").then((res) => {
  console.log(res.ok, res.status, res);
  if (!res.ok) return Promise.reject(res.status);
}).catch((e) => {
  alert(`WHOOPS: ${e}`);
});

