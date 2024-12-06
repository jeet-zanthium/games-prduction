import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.send('WebSocket route is active!');
});

// Example of triggering WebSocket events via HTTP
router.post('/broadcast', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return void res
      .status(400)
      .json({ success: false, message: 'Message is required' });
  }

  req.app.get('io').emit('broadcast', { message });
  res.json({ success: true, message: 'Message broadcasted!' });
});
// router.post("/broadcast", (req, res) => {
//   const { message } = req.body;
//   if (!message) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Message is required" });
//   }

//   req.app.get("io").emit("broadcast", { message });
//   res.json({ success: true, message: "Message broadcasted!" });
// });

export default router;
