import React, {useState} from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './index.module.css'

export default function FeedbackBox() {
    const [voted, setVoted] = useState(null);

    const handleVote = (type) => {
      setVoted(type);
    };

    return (
      <BrowserOnly>
      {() => {
        const hostname = window.location.hostname;
        if (hostname.includes('zdoc') || hostname.includes('localhost')) {
          if (voted) {
            return (
              <div id="feedback-box" className={styles.feedbackBox} role="status" aria-live="polite">
                <div className={styles.confirmation}>
                  <span className="material-symbols-outlined">check_circle</span>
                  感谢您的反馈！
                </div>
              </div>
            );
          }

          return (
            <div
              id="feedback-box"
              className={styles.feedbackBox}
              role="group"
              aria-label="页面反馈"
            >
              <div className={styles.feedbackPrompt}>
                本页内容对您有帮助吗？
              </div>
              <div className={styles.feedbackButtons}>
                <button
                  className={styles.thumbButton}
                  onClick={() => handleVote('up')}
                  aria-label="有帮助"
                >
                  <i className={styles.thumbIcon}>
                    <span className="material-symbols-outlined">thumb_up</span>
                  </i>
                </button>
                <button
                  className={styles.thumbButton}
                  onClick={() => handleVote('down')}
                  aria-label="没有帮助"
                >
                  <i className={styles.thumbIcon}>
                    <span className="material-symbols-outlined">thumb_down</span>
                  </i>
                </button>
              </div>
            </div>
          );
        } else {
          return <></>
        }
      }}
      </BrowserOnly>
    )
  }
