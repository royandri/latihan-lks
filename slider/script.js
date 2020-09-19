const handleSlider = (idSlider, color, elmValue) => {
    const slider = document.getElementById(idSlider);

    document.getElementById(elmValue).innerHTML = slider.value;
    
    document.documentElement.style.setProperty(color, slider.value);
}