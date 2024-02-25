import React from 'react'
import styles from './css/Exemptions.module.css'
import { useTranslation } from 'react-i18next'

const Exemptions = ({ exemptions }) => {
  const { t } = useTranslation()

  return (
    <div>
      <h2>{t('recognitionOfStudies')}</h2>
      <div className={styles.scrollableTable}>
        {Object.keys(exemptions).length > 0 &&
        Object.values(exemptions).flat().length > 0 ? (
          <table className={styles.entryBox}>
            <thead>
              <tr>
                <th className={styles.label}>{t('institution')}</th>
                <th className={styles.label}>{t('courseName')}</th>
                <th className={styles.label}>{t('credits')}</th>
                <th className={styles.label}>{t('courseType')}</th>
                <th className={styles.label}>{t('courseCompletionDate')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(exemptions)
                .flat()
                .map((data, index) => (
                  <tr key={index}>
                    <td
                      className={`${styles.institutionLabel} ${styles.institutionValue}`}
                    >
                      {data.original_institution}
                    </td>
                    <td
                      className={`${styles.courseNameLabel} ${styles.courseNameValue}`}
                    >
                      {data.original_course_name}
                    </td>
                    <td
                      className={`${styles.creditsLabel} ${styles.creditsValue}`}
                    >
                      {data.original_credits}
                    </td>
                    <td className={`${styles.typeLabel} ${styles.typeValue}`}>
                      {data.type}
                    </td>
                    <td
                      className={`${styles.completionDateLabel} ${styles.completionDateValue}`}
                    >
                      {data.completion_date
                        ? new Date(data.completion_date).toLocaleDateString(
                            'fi-FI',
                          )
                        : ''}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>
            No exemptions found. Please check back later.
          </p>
        )}
      </div>
    </div>
  )
}

export default Exemptions
