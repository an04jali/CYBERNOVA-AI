import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import Layout from './pages/Layout'
import WriteArticle from './pages/WriteArticle'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import Interview from './pages/Interview'
import ReviewResume from './pages/ReviewResume'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/ai" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="write-article" element={<WriteArticle />} />
        <Route path="generate-images" element={<GenerateImages />} />
        <Route path="remove-background" element={<RemoveBackground />} />
        <Route path="review-resume" element={<ReviewResume />} />
        <Route path="interview" element={<Interview />} />
      </Route>

    
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}

export default App