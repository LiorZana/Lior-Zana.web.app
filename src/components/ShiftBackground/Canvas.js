import React, { forwardRef } from 'react'

const Canvas = forwardRef((props, ref) => {


return <canvas ref={ref} {...props}/>;

})

export default Canvas;