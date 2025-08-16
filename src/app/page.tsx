
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Zap, Gauge, Users, Bot, Camera, BarChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: 'Automation',
      description: 'Fully automates the attendance process, saving time and reducing manual errors.',
    },
    {
      icon: <Check className="h-8 w-8 text-blue-400" />,
      title: 'Accuracy',
      description: 'Leverages advanced AI for highly accurate facial recognition, ensuring reliable data.',
    },
    {
      icon: <Gauge className="h-8 w-8 text-blue-400" />,
      title: 'Speed',
      description: 'Verifies attendance in real-time, providing instant records and analytics.',
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: 'Scalability',
      description: 'Easily scales from a single classroom to an entire campus without performance loss.',
    },
  ];

  const outcomes = [
    'Reduced administrative overhead.',
    'Improved accuracy in attendance records.',
    'Real-time insights into student presence.',
    'Enhanced campus security and monitoring.',
    'Streamlined process for teachers and staff.',
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
           <Image
            src="https://i.postimg.cc/MGck8n4C/pexels-cottonbro-9665216.jpg"
            alt="Classroom"
            fill
            style={{objectFit: 'cover'}}
            className="absolute inset-0 -z-10 h-full w-full"
            />
          <div className="absolute inset-0 -z-10 h-full w-full bg-black/60"></div>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-headline font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Automated Attendance, <span className="text-blue-400">Intelligently Done.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-gray-300 md:text-xl">
              AttendAI revolutionizes attendance monitoring with cutting-edge AI. Seamless, accurate, and effortless for modern educational institutions.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">About the Project</h2>
                <p className="mt-4 text-muted-foreground">
                  Traditional attendance systems are time-consuming and prone to errors. AttendAI addresses this by providing a fully automated solution that uses facial recognition to verify student attendance. Our system is designed to be non-intrusive, highly accurate, and provide valuable data to educators and administrators, solving the critical problem of inefficient and unreliable attendance tracking.
                </p>
              </div>
              <div className="flex justify-center">
                <Image src="https://i.postimg.cc/j5RGKbDp/5597107-56387-1024x642.jpg" alt="AI Face Recognition Graphic" data-ai-hint="facial recognition" width={550} height={310} className="rounded-lg shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        <section id="methodology" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Our Methodology</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our system follows a simple yet powerful three-step process to ensure seamless attendance verification.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-3 md:gap-12">
              <div className="grid gap-1 text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full"><Camera className="h-10 w-10 text-primary" /></div>
                </div>
                <h3 className="text-lg font-bold font-headline">1. Capture</h3>
                <p className="text-sm text-muted-foreground">The system captures images from connected cameras in classrooms.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full"><Bot className="h-10 w-10 text-primary" /></div>
                </div>
                <h3 className="text-lg font-bold font-headline">2. Verify</h3>
                <p className="text-sm text-muted-foreground">Our AI model processes the images, identifies students, and verifies their presence against a database.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full"><BarChart className="h-10 w-10 text-primary" /></div>
                </div>
                <h3 className="text-lg font-bold font-headline">3. Report</h3>
                <p className="text-sm text-muted-foreground">Attendance is recorded in real-time, with analytics available on the dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative w-full py-12 md:py-24 lg:py-32">
          <Image
            src="https://i.postimg.cc/MGck8n4C/pexels-cottonbro-9665216.jpg"
            alt="Features Background"
            fill
            style={{objectFit: 'cover'}}
            className="absolute inset-0 -z-10 h-full w-full"
            />
           <div className="absolute inset-0 -z-10 h-full w-full bg-black/60"></div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-white">Core Features</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the powerful features that make AttendAI the ultimate attendance solution.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex justify-center">{feature.icon}</div>
                    <CardTitle className="font-headline mt-4 text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="outcomes" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
             <div className="grid gap-10 md:grid-cols-2 lg:gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Expected Outcomes</h2>
                    <p className="mt-4 text-muted-foreground">
                        Implementing AttendAI brings tangible benefits to educational institutions.
                    </p>
                    <ul className="mt-6 space-y-4">
                        {outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start">
                            <Check className="h-5 w-5 mt-1 mr-3 flex-shrink-0 text-green-500" />
                            <span className="text-muted-foreground">{outcome}</span>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center">
                    <Image src="https://i.postimg.cc/G2hdKYxT/manual-vs-ai-based-attendance-system.jpg" alt="Data Analytics Dashboard" data-ai-hint="dashboard analytics" width={550} height={310} className="rounded-lg shadow-xl" />
                </div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
