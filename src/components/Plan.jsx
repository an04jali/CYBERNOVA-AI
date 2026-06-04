import React, { useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'

const Plan = () => {

  const { user } = useUser()
  const { openSignIn } = useClerk()

  const [loadingPlan, setLoadingPlan] = useState(false)

  const handleFree = () => {

    if (!user) {
      openSignIn()
      return
    }

    alert("Free Plan Activated")

  }

  const handlePremium = async () => {

    if (!user) {
      openSignIn()
      return
    }

    try {

      setLoadingPlan(true)

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: 200 * 100,

        currency: "INR",

        name: "CyberNova AI",

        description: "Premium Subscription",

        handler: function (response) {

          alert("Payment Successful!")

          console.log(response)

        },

        prefill: {

          name: user?.fullName || "",

          email: user?.primaryEmailAddress?.emailAddress || ""

        },

        theme: {
          color: "#00C6FF"
        }

      }

      const razor = new window.Razorpay(options)

      razor.open()

    } catch (err) {

      console.error(err)

      alert("Payment Failed")

    } finally {

      setLoadingPlan(false)

    }

  }

  return (

    <section style={{
      background: '#0a0e1a',
      padding: '25px 12px',
      position: 'relative',
      zIndex: 2,
    }}>

      {/* Heading */}
      <div style={{
        textAlign: 'center',
        marginBottom: 28,
      }}>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#fff',
          marginBottom: 6,
        }}>
          Choose Your Plan
        </h2>

        <p style={{
          color: 'rgba(200,220,255,0.5)',
          fontSize: '0.82rem',
        }}>
          Start free and upgrade anytime.
        </p>

      </div>

      {/* Cards */}
      <div style={{
        maxWidth: 680,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: 14,
      }}>

        {/* FREE */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(0,198,255,0.12)',
          borderRadius: 20,
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(12px)',
        }}>

          <h3 style={{
            color: '#fff',
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: 6,
          }}>
            Free
          </h3>

          <p style={{
            color: 'rgba(200,220,255,0.45)',
            marginBottom: 18,
            fontSize: '0.82rem',
          }}>
            Best for beginners.
          </p>

          <div style={{
            color: '#fff',
            fontSize: '2.3rem',
            fontWeight: 800,
            marginBottom: 18,
          }}>
            $0
          </div>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 22px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            flex: 1,
          }}>

            {[
              'AI Article Writer',
              'Blog Generator',
              'Resume Review',
              'Limited Usage'
            ].map((item, i) => (

              <li
                key={i}
                style={{
                  color: 'rgba(220,235,255,0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.84rem',
                }}
              >
                <span style={{
                  color: '#00C6FF',
                  fontWeight: 700,
                }}>
                  ✓
                </span>

                {item}

              </li>

            ))}

          </ul>

          <button
            onClick={handleFree}
            style={{
              width: '100%',
              padding: '9px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(0,198,255,0.2)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            {user ? 'Current Plan ✓' : 'Get Started'}
          </button>

        </div>

        {/* PREMIUM */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,198,255,0.07), rgba(0,114,255,0.12))',
          border: '1px solid rgba(0,198,255,0.28)',
          borderRadius: 20,
          padding: 18,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(14px)',
        }}>

          {/* Badge */}
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
            color: '#fff',
            fontSize: '0.55rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 999,
          }}>
            POPULAR
          </div>

          <h3 style={{
            color: '#fff',
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: 6,
          }}>
            Premium
          </h3>

          <p style={{
            color: 'rgba(220,235,255,0.55)',
            marginBottom: 18,
            fontSize: '0.82rem',
          }}>
            Advanced AI tools.
          </p>

          <div style={{
            marginBottom: 18,
          }}>

            <span style={{
              color: '#fff',
              fontSize: '2.3rem',
              fontWeight: 800,
            }}>
              $2
            </span>

            <span style={{
              color: 'rgba(220,235,255,0.4)',
              fontSize: '0.8rem',
            }}>
              /month
            </span>

          </div>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 22px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            flex: 1,
          }}>

            {[
              'Unlimited AI Usage',
              'ATS Resume Scorer',
              'AI Mock Interview',
              'Priority Generation',
            ].map((item, i) => (

              <li
                key={i}
                style={{
                  color: 'rgba(220,235,255,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.84rem',
                }}
              >
                <span style={{
                  color: '#00C6FF',
                  fontWeight: 700,
                }}>
                  ✓
                </span>

                {item}

              </li>

            ))}

          </ul>

          <button
            onClick={handlePremium}
            disabled={loadingPlan}
            style={{
              width: '100%',
              padding: '9px',
              borderRadius: 999,
              background: loadingPlan
                ? 'rgba(0,198,255,0.4)'
                : 'linear-gradient(135deg, #00C6FF, #0072FF)',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: loadingPlan ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(0,114,255,0.25)',
            }}
          >
            {loadingPlan
              ? 'Loading...'
              : 'Upgrade →'}
          </button>

          <p style={{
            textAlign: 'center',
            marginTop: 10,
            fontSize: '0.65rem',
            color: 'rgba(220,235,255,0.3)',
          }}>
            🔒 Razorpay Secure Checkout
          </p>

        </div>

      </div>

    </section>

  )
}

export default Plan