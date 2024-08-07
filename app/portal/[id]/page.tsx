"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { createClerkSupabaseClient } from '@/app/utils/supabase/clerk'
import Logo from '@/public/happybase.svg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUser, useOrganization } from '@clerk/nextjs';

export default function BroadcastPage() {
  const [broadcast, setBroadcast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [url, setUrl] = useState('')
  const [inviteeEmail, setInviteeEmail] = useState(''); 
  const [inviteLink, setInviteLink] = useState('');
  const [price, setPrice] = useState('');
  const [interval, setInterval] = useState('');
  const { user } = useUser();
  const params = useParams()
  const { id } = params
  const { organization } = useOrganization();

  useEffect(() => {
    const fetchBroadcast = async () => {
      if (!id || !user?.id || !organization?.id) {
        console.error('ID or user ID or organization ID is not provided')
        setLoading(false)
        return
      }
  
      console.log('Fetching broadcast with ID:', id)
  
      const supabase = createClerkSupabaseClient()
      const { data: broadcastData, error: broadcastError } = await supabase
        .from('portals')
        .select('*')
        .eq('id', id)
        .maybeSingle()
  
      if (broadcastError) {
        console.error('Error fetching broadcast:', broadcastError)
        setLoading(false)
        return
      }
  
      if (!broadcastData) {
        console.error('Broadcast not found')
        setLoading(false)
        return
      }

      setBroadcast(broadcastData)
      setUrl(broadcastData.url)
      setPrice(broadcastData.price)
      setInterval(broadcastData.interval)
      setInviteLink(broadcastData.payment_link)
      setLoading(false)
    }
  
    fetchBroadcast()
  }, [id, user?.id, organization?.id])

  if (loading) return <div>Loading...</div>
  if (!broadcast) return <div>Broadcast not found</div>

  let formattedInterval = '';
  switch (interval) {
    case 'monthly':
      formattedInterval = '/mo';
      break;
    case 'quarterly':
      formattedInterval = '/qtr';
      break;
    case 'yearly':
      formattedInterval = '/yr';
      break;
    default:
      formattedInterval = '';
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {url ? (
        <iframe
          src={url}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Embedded Content"
        />
      ) : (
        <p>App URL not found</p>
      )}

      {/* Paywall overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Subscribe to Access Content</h2>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>Sign up now for ${price}{formattedInterval}</p>
        <a href={inviteLink} target="_blank" rel="noopener noreferrer" style={{ width: '200px' }}>
          <Button className="flex w-full hover:border border text-white hover:text-black bg-black items-center space-x-2">
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-s-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-6-pack-logos-icons-3030363.png" className="h-4 mr-1 w-4" alt="Stripe logo" />
            Pay with Stripe
          </Button>
        </a>
      </div>

      {/* Powered by Happybase widget */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <span className='mr-2'>Powered by Happybase</span>
        <Logo />
      </div>
    </div>
  )
}