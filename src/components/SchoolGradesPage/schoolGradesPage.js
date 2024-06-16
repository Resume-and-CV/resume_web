import React, { useState, useEffect } from 'react'

//import mainBoxStyles from '../css/mainBoxStyles.module.css'
import Header from '../header/Header'
import { useLocation } from 'react-router-dom'
import api from '../../middleWare/axiosInterceptor'
import { useTranslation } from 'react-i18next'
import styles from './css/schoolGrades.module.css'
import BasicAndProfessionalStudies from './BasicAndProfessionalStudies'
//import Exemptions from './Exemptions'

const SchoolGradesPage = () => {
  let { state } = useLocation()
  let education_id = state.education_id
  let total_credits_required = state.total_credits_required
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  const [courses, setCourses] = useState([])
  //const [exemptions, setExemptions] = useState([])

  const sumOfCredits = courses.reduce(
    (sum, course) => sum + parseInt(course.credits),
    0,
  )

  useEffect(() => {
    const getCoursesAndExemptions = async () => {
      try {
        const config = {
          headers: {
            'Accept-Language': i18n.language,
            education_id: education_id,
          },
        }
        //console.log('language', i18n.language)
        //console.log('education_id', education_id)
        // Fetch courses
        const coursesResponse = await api.get(`/course/lang`, config)
        const fetchedCourses = coursesResponse.data
        setCourses(fetchedCourses)

        // Fetch exemptions for each course
        /* const exemptionsPromises = fetchedCourses.map((course) =>
          api
            .get(`/exemption/lang`, {
              headers: {
                'Accept-Language': i18n.language,
                course_id: course.course_id, // Use course.course_id here
              },
            })
            .then((response) => ({
              course_id: course.course_id,
              exemptions: response.data,
            }))
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                // No exemptions for this course, return an empty array
                return { course_id: course.course_id, exemptions: [] }
              } else {
                // For other types of errors, you might want to handle them differently
                // For example, you could log the error, show a message to the user, etc.
                console.error(error)
                throw error
              }
            }),
        )

        // Await all the exemption fetch promises
        const exemptionsForCourses = await Promise.all(exemptionsPromises)

        // Reduce the resolved promises to accumulate exemptions
        const exemptionsObject = exemptionsForCourses.reduce((acc, current) => {
          acc[current.course_id] = current.exemptions
          return acc
        }, {}) */

        //  setExemptions(exemptionsObject)
      } catch (error) {
        console.error('Error fetching courses or exemptions:', error)
      }
    }

    getCoursesAndExemptions()
  }, [i18n.language, education_id])

  const validCourses = courses.filter((course) => course.grade !== null)
  const grades = validCourses.map((course) => parseInt(course.grade))
  const sumOfGrades = grades.reduce((a, b) => a + b, 0)
  const averageGrade = (sumOfGrades / validCourses.length).toFixed(2)

  return (
    <div>
      <Header />
      <div className={styles.mainBox}>
        <div className={styles.box}>
          <h1 className={styles.heading}>{t('grade_information')}</h1>
          <h2 className={styles.heading2}>
            {t('sum_of_credits')}: {sumOfCredits} / {total_credits_required}{' '}
          </h2>
          <h2 className={styles.heading2}>
            {t('average_grade')}: {averageGrade}
          </h2>

          {/* Subheading for Courses */}
          <BasicAndProfessionalStudies courses={courses} />
          {/* Subheading for Exemptions */}
          {/*   <Exemptions exemptions={exemptions} /> */}
        </div>
      </div>
    </div>
  )
}
export default SchoolGradesPage
