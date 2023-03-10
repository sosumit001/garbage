import './RoundSpin.css'

  const RoundSpin = ({text, size,scale})  => {

    const containerStyle  = {
        margin:"auto",
        padding:"4px",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: `${size + 15}px`,
        height: `${size + 15}px`,
        borderRadius: "50%",
        fontSize: "18px",
        animation:"rotate 5s reverse linear infinite",
        zIndex:"100",
        display:(scale === 0)?"none":"flex",
        backgroundColor:"rgba(0,0,0,0.9)"
      }
      
      // to add value to the fontSize propert
      

    const textCollection = []

    const diameter = size

    const angle = 360 / text.length
    for (let i = 0; i < text.length; i++) {
      const _TRANSFORM_ = ` scale(${scale}) rotate(${i * angle}deg) translateZ(-1800px) translateY(-${diameter / 2}px)  rotate(-${i * angle}deg)`
      const letter = <span key={i} style = {{transformOrigin:'bottom center',whiteSpace:"nowrap",transform:_TRANSFORM_,position:'absolute'}}>{text[i]}</span>
      textCollection.push(letter)
    }
    return (
    <div className='circular-text' style={containerStyle}>
       {textCollection}
       <div></div>
    </div>
    )

}

export default RoundSpin
