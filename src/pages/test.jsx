import React from 'react'
import FaceRecoginitionPanel from '../components/FaceRecoginitionPanel'
import Header from '../components/Header'


const styles = {
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
minHeight: '100vh'
}

const Test = () => {
  return (
    // <Header />

    // <Detection />
    <div style={styles}>
        <FaceRecoginitionPanel />
        </div>
  )
}

export default Test