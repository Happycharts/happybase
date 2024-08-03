"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useUser, useOrganization } from "@clerk/nextjs";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";  // Adjust the import path as needed
import { Input } from '@/components/ui/input';
import PaymentLinkModal from '@/components/payment-link'; // Adjust the import path as needed
import { createClient } from '@/app/utils/supabase/client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MoneyInput from "@/components/ui/money-input";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { AnalyticsBrowser } from '@segment/analytics-next'
import { useClerk } from "@clerk/nextjs";
// Initialize Supabase client

type MerchantData = {
  id: string;
  organization: string;
  onboarding_link: string | null;
};

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [schedulingLink, setSchedulingLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUser();
  const { organization, membership } = useOrganization();
  const firstName = user?.user?.firstName;
  const lastName = user?.user?.lastName;
  const email = user?.user?.primaryEmailAddress?.emailAddress;
  const orgName = useOrganization().organization?.name;
  const orgId = useOrganization().organization?.id;
  const { session } = useClerk();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  const [merchantData, setMerchantData] = useState<MerchantData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();
  const analytics = AnalyticsBrowser.load({ writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY || '' });

  const createMerchant = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-merchant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: user.user?.firstName,
          last_name: user.user?.lastName,
          email: user.user?.primaryEmailAddress?.emailAddress,
          organization: orgId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMerchantData({
          id: data.id,
          organization: orgId as string,
          onboarding_link: data.url,
        });
        setIsStripeConnected(true);
      } else {
        console.error('Error creating merchant:', await response.json());
      }
    } catch (error) {
      console.error('Error creating merchant:', error);
    } finally {
      setIsLoading(false);
    }
  };

  analytics.group(orgId, {
    name: orgName,
    email: email,
    firstName: firstName,
    lastName: lastName,
  }
);
analytics.identify(orgId, {
    email: email,
    firstName: firstName,
    lastName: lastName,
  }
);
analytics.track(
  'Viewed Home Page',
  {
    orgId: orgId,
    orgName: orgName,
    email: email,
    firstName: firstName,
    lastName: lastName,
  }
);

useEffect(() => {
  let isMounted = true;
  const fetchDataAndCheckAdmin = async () => {
    if (!user?.user?.id || !organization?.id) return;

    setIsLoading(true);

    const adminStatus = checkIfUserIsAdmin();
    if (isMounted) {
      setIsAdmin(adminStatus);
    }

    const { data: merchantData, error: merchantError } = await supabase
      .from('merchants')
      .select('*')
      .eq('organization', organization.id)
      .single();

    if (merchantError) {
      console.error("Error fetching merchant data:", merchantError);
    } else if (isMounted) {
      setMerchantData(merchantData);
      setIsStripeConnected(!!merchantData?.onboarding_link);
    }

    setIsLoading(false);
  };

  fetchDataAndCheckAdmin();

  return () => {
    isMounted = false;
  };
}, [user?.user?.id, organization?.id, membership]);

function checkIfUserIsAdmin(): boolean {
  if (!membership) return false;
  console.log("User role:", membership.role);
  return membership.role === 'org:admin' || membership.role === 'admin';
}

  const SkeletonContent = () => (
    <>
      <Card className="w-full max-w-4xl mx-auto border-black border-opacity-20 rounded-lg mb-8">
        <CardContent className="p-8">
          <Skeleton className="h-10 w-3/4 mx-auto mb-8" />
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="w-full">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
          <Skeleton className="h-20 w-full mb-8" />
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl mx-auto shadow-lg border-black border-opacity-20 rounded-lg mt-8">
        <CardContent className="p-8">
          <Skeleton className="h-10 w-1/2 mb-6" />
          <Skeleton className="h-6 w-3/4 mb-6" />
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="mb-6">
              <Skeleton className="h-8 w-3/4 mb-3" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-10 w-40" />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );

  const stripeConnectUrl = merchantData?.onboarding_link || `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_Qa1YXbHMD2SL28qGP1igjAmJyc3oeq6W&scope=read_write&redirect_uri=https://app.happybase.co/portals`;

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      {loading ? (
        <SkeletonContent />
      ) : (
        <>
          {/* New Walkthrough Card */}
          <Card className="w-full max-w-4xl mx-auto shadow-lg border-black border-opacity-20 rounded-lg mt-8">
            <CardContent className="p-8">
              <h2 className="text-4xl font-bold text-black mb-6 text-left">Welcome to Happybase!</h2>
              <h2 className="text-2xl font-bold text-black mb-6 text-left">Getting Started</h2>
              <p className="text-lg text-black mb-6 text-left">Follow these steps to get set up and start using our platform effectively.</p>
              <ol className="space-y-6">
                <li className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-3">1. Connect with Stripe</h3>
                  <p className="text-black mb-4">Connect a Stripe account so you can start setting rates for your data access</p>
                  {isAdmin ? (
                      <>
                        {isStripeConnected ? (
                          <Link href={stripeConnectUrl}>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isStripeConnected}
                              className="flex items-center space-x-2"
                            >
                              <img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-s-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-6-pack-logos-icons-3030363.png" className="h-4 w-4" />
                              <span>{isStripeConnected ? 'Connected to Stripe' : 'Connect with Stripe'}</span>
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={createMerchant}
                            className="flex items-center space-x-2"
                          >
                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-s-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-6-pack-logos-icons-3030363.png" className="h-4 w-4" />
                            <span>Connect with Stripe</span>
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button variant="outline" size="sm" disabled className="flex items-center space-x-2">
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-s-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-6-pack-logos-icons-3030363.png" className="h-4 w-4" />
                        <span>Connect with Stripe</span>
                      </Button>
                    )}
                </li>
                <li className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-3">2. Connect your first tool</h3>
                  <p className="text-black mb-4">Connect a tool so you can start centralizing your semantic layer.</p>
                  <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-300">
                    <Link href="/apps/add">
                      Add a tool
                    </Link>
                  </Button>
                </li>
                <li className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-3">3. Create a portal</h3>
                  <p className="text-black mb-4">Publish your tool so your partners and audience can learn about your data program</p>
                  <div className="flex items-center space-x-2">
                    <div style={{
                      position: 'relative',
                      paddingBottom: 'calc(51.36054421768708% + 41px)',
                      height: 0,
                      width: '100%'
                    }}>
                      <iframe
                        src="https://demo.arcade.software/Bc532er376ZZJTQAfWyh?embed&show_copy_link=true"
                        title="localhost:3000/apps"
                        frameBorder="0"
                        loading="lazy"
                        allow="clipboard-write"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          colorScheme: 'light'
                        }}
                      ></iframe>
                    </div>
                  </div>
                </li>
                <li className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-3">4. Invite your data stakeholders</h3>
                  <p className="text-black mb-4">Send the link to your data access portal to your partners, researchers, and LLM developers so they can request access to your data</p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
