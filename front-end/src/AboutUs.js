// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const AboutUs = () => {
//   const [aboutUsData, setAboutUsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAboutUsData = async () => {
//     try {
//       axios
//       .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
//       .then(response => {
//         // axios bundles up all response data in response.data property
//         const about = response.data.about
//         setAboutUsData(about)
//       })
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {


//     fetchAboutUsData();

//     return () => {}; // Cleanup function to prevent memory leaks
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
    // <div>
    //   <h1>{aboutUsData.title}</h1>
    //   <p>{aboutUsData.content}</p>
    // </div>
//   );
// };

// export default AboutUs;
import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'

/**
 * A React component that shows a form the user can use to create a new message, as well as a list of any pre-existing messages.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutUsData, setAboutUsData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')

  /**
   * A nested function that fetches messages from the back-end server.
   */
  const fetchAboutUsData = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const content = response.data
        setAboutUsData(content)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }


  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    fetchAboutUsData()

    // set a timer to load data from server every n seconds
    const intervalHandle = setInterval(() => {
      fetchAboutUsData()
    }, 5000)

    // return a function that will be called when this component unloads
    return e => {
      // clear the timer, so we don't still load messages when this component is not loaded anymore
      clearInterval(intervalHandle)
    }
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <div>
      <h1>{aboutUsData.name}</h1>
      <p>{aboutUsData.bio}</p>
      <img className="image" src={aboutUsData.picture} alt="Silu Xing" />
    </div>
  )
}

// make this component available to be imported into any other file
export default AboutUs
