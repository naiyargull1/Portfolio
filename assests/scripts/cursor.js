
   
  // Chnage folder and framecount here 
  const folder = "assests/images/cursor";  
  const frameCount = 4; 
  
  const frames = [];

  for (let i = 1; i <= frameCount; i++) {
    frames.push(`${folder}/frame${i}.png`);
  }

  let index = 0;
  const fps = 10;

  setInterval(() => {
    document.body.style.cursor =
     `url(${frames[index]}), auto`;
    index = (index + 1) % frames.length;
  }, 1000 / fps);
