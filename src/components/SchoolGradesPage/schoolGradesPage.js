import React, { useState, useEffect } from 'react'

import mainBoxStyles from '../css/mainBoxStyles.module.css'
import Header from '../header/Header'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import styles from './css/schoolGrades.module.css'
import BasicAndProfessionalStudies from './BasicAndProfessionalStudies'
import Exemptions from './Exemptions'

const SchoolGradesPage = () => {
  let { state } = useLocation()
  let education_id = state.education_id
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  const [courses, setCourses] = useState([])
  const [exemptions, setExemptions] = useState([])

  useEffect(() => {
    const getCoursesAndExemptions = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Accept-Language': i18n.language,
            Authorization: `Bearer ${token}`,
          },
        }

        // Fetch courses
        const coursesResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/education/courses`,
          { ...config, params: { education_id } },
        )
        const fetchedCourses = coursesResponse.data
        setCourses(fetchedCourses)

        // Fetch exemptions for each course
        const exemptionsPromises = fetchedCourses.map((course) =>
          axios
            .get(
              `${process.env.REACT_APP_SERVER_URL}/education/exemptions/?course_id=${course.course_id}`,
              config,
            )
            .then((response) => ({
              course_id: course.course_id,
              exemptions: response.data,
            }))
            .catch((error) => {
              return { course_id: course.course_id, exemptions: [] } // Return an empty array for this course in case of an error
            }),
        )

        // Await all the exemption fetch promises
        const exemptionsForCourses = await Promise.all(exemptionsPromises)

        // Reduce the resolved promises to accumulate exemptions
        const exemptionsObject = exemptionsForCourses.reduce((acc, current) => {
          acc[current.course_id] = current.exemptions
          return acc
        }, {})

        setExemptions(exemptionsObject)
      } catch (error) {
        console.error('Error fetching courses or exemptions:', error)
      }
    }

    getCoursesAndExemptions()
  }, [i18n.language, education_id])

  return (
    <div>
      <Header />
      <div className={mainBoxStyles.mainBox}>
        <div className={styles.box}>
          <h1 className={styles.heading}>{t('grade_information')}</h1>
          {/* Subheading for Courses */}
          <BasicAndProfessionalStudies courses={courses} />
          {/* Subheading for Exemptions */}
          <Exemptions exemptions={exemptions} />
        </div>
      </div>
    </div>
  )
}
export default SchoolGradesPage
