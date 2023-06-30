const express = require("express");
const app = express();
const PORT = 8080;
const google = require("googlethis");

app.listen(PORT, () => {
  console.log("alive at " + PORT);
});

app.get("/search/:searchTerm",async (req, res) => {
  const { searchTerm } = req.params;
  const options = req.body || {
    page: 0,
    safe: false,
    additional_params: {
      hl: 'en'
    }
}
  try {
      const data = await google.search(searchTerm,options);
     
        res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get("/images/:searchTerm",async (req,res) => {
    const { searchTerm } = req.params;
    try {
        const data = await google.image(searchTerm,{ safe: false });
          res.json(data);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
})



app.get("/news/",async (req,res) => {
    try {
        const data = await google.getTopNews();
          res.json(data);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
})



