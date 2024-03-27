import express from "express";
const app = express();
const port = 3000;

import testApi from "./testapi.json" assert { type: "json" };

app.get("/search", (req, res) => {
  console.log(req.query);
  let result = [];
  (function () {
    const { q = "win", count = 10 } = req.query;

    if (Number(count) > 20) {
      return res.send('"count" should be less than 20');
    } else {
      let testApiFilteredResult = testApi.filter((item) => {
        return (
          item.keywords.toLowerCase().includes(q.toLowerCase()) ||
          item.title.toLowerCase().includes(q.toLowerCase())
        );
      });
      result.push(...testApiFilteredResult.slice(0, Number(count)));
    }
  })();

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
