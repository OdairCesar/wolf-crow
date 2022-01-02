import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/layout/header'
import Contact from './components/pages/contact'
import Store from './components/pages/store'
import Videos from './components/pages/videos'
import Home from './components/pages/home'
import Curiosities from './components/pages/curiosities'

import './App.css'

import apiYT from './service/apiYouTubeV3'

export default function App() {
  const [ channel, setChannel ] = useState({})
  const [ listVideo, setListVideo ] = useState([])
  const [ featured, setFeatured ] = useState(null)

  useEffect(() => {
    const loadAll = async() => {
      const channel = await apiYT.getChannel()
      setChannel(channel.items[0])

      const list = await apiYT.getListVideo()
      console.log(list.items[0])
      setListVideo(list.items)

      setFeatured(list.items[0])
    }

    loadAll()
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route 
            path='/contact'
            element={<Contact channel={channel}/>}
          />
          <Route 
            path='store'
            element={<Store />}
          />
          <Route 
            path='/videos'
            element={<Videos />}
          />
          <Route 
            path='/curiosities'
            element={<Curiosities />}
          />
          <Route 
            exact path='/'
            element={<Home featured={featured} list={listVideo}/>}
          />
          <Route 
            path="*" 
            element={<Home />}
          />
        </Routes>
      </div>
    </Router>
  );
}
