import { React, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavBarStu } from '../util'

const SemReports = () => {

  const { semester } = useParams();

  return (
    <>
      <NavBarStu />
      sem : {semester}
    </>
  )
}

export default SemReports