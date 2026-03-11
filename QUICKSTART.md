# Quick Start Guide - ETHMAR Chess Animation

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
cd nextjs-demo
npm install
```

### Step 2: Add Font File
1. Locate your `Optima.ttc` file
2. Copy it to: `public/fonts/Optima.ttc`

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to: `http://localhost:3000`

## ✅ What You Should See

1. **Loading Screen**: Brief loading indicator
2. **3D Chess Scene**: Interactive chess pieces
3. **Hero Text**: "The Art of Strategy"
4. **Scroll Indicator**: Arrow pointing down

## 🎮 Try These Interactions

### On Desktop:
- Hover over any chess piece → It scales up and rotates
- Click and drag → Rotate the camera
- Scroll → Zoom in/out
- Click a piece → Activate it

### On Mobile:
- Swipe horizontally → Rotate pieces
- Swipe vertically → Float pieces up/down
- Pinch → Zoom camera
- Scroll down → See About section

## 📱 Testing Checklist

- [ ] 3D scene loads without errors
- [ ] Chess pieces are visible
- [ ] Hover works on desktop
- [ ] Swipe works on mobile
- [ ] Font loads correctly (check with DevTools)
- [ ] Smooth animations at 60fps
- [ ] About section appears on scroll
- [ ] No console errors

## 🐛 Quick Troubleshooting

### "Window is not defined"
- This is expected - ignore it during SSR
- The dynamic import handles this automatically

### Black Screen
1. Check browser console for errors
2. Verify WebGL is supported: `about:gpu` in Chrome
3. Update graphics drivers

### Font Not Showing
1. Check file exists: `public/fonts/Optima.ttc`
2. Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
3. Check Network tab in DevTools

### Slow Performance
1. Close other tabs
2. Check FPS in DevTools Performance monitor
3. Reduce number of pieces in `ChessScene.tsx`

## 📂 Optional: Add Images from .ai File

If you want to use the images from your Adobe Illustrator file:

1. Export images as PNG from .ai file
2. Create folder: `public/images/`
3. Copy PNG files there
4. They're ready to use as textures!

## 🎨 Customization Quick Tips

### Change Colors:
Edit `tailwind.config.js` → `colors.ethmar`

### Adjust Animation Speed:
Edit `components/ChessPiece.tsx` → `delta * 0.5` (line with rotation)

### Change Number of Pieces:
Edit `components/ChessScene.tsx` → `pieces` array

### Modify Lighting:
Edit `components/ChessScene.tsx` → Light component props

## 📚 Next Steps

1. Read `README.md` for full documentation
2. Check `IMPLEMENTATION.md` for technical details
3. Explore components in `/components` folder
4. Customize to match your vision!

## 🎯 Deploy When Ready

### To Vercel (Easiest):
```bash
npm run build
vercel
```

### To Other Platforms:
```bash
npm run build
npm run start
```

## 💬 Need Help?

- Check the console for error messages
- Review the README.md
- Check the IMPLEMENTATION.md for technical details
- Verify all dependencies are installed

---

**Enjoy building with ETHMAR!** 🎨♟️