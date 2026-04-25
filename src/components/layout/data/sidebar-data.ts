import {
  Construction,
  LayoutDashboard,
  Monitor,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Package,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Image,
  Backpack,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ClerkLogo } from '@/assets/clerk-logo'
import ChatIcon from '@/assets/custom/icon-chat'
import DocumentIcon from '@/assets/custom/icon-document'
import HandIcon from '@/assets/custom/icon-hand'
import ImageIcon from '@/assets/custom/icon-image'
import LightbulbIcon from '@/assets/custom/icon-lightbulb'
import UsersIcon from '@/assets/custom/icon-users'
import WorkIcon from '@/assets/custom/icon-work'
import { type SidebarData } from '../types'

export const useSidebarData = (): SidebarData => {
  const { t } = useTranslation()

  return {
    user: {
      name: 'satnaing',
      email: 'satnaingdev@gmail.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'Shadcn Admin',
        logo: '/images/Oulemas-removebg-preview.png',
        plan: 'Vite + ShadcnUI',
      },
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
    ],
    navGroups: [
      {
        title: 'General',
        items: [
          {
            title: t('sidebar.dashboard'),
            url: '/',
            icon: LayoutDashboard,
          },
          {
            title: t('sidebar.websiteContent'),
            icon: ImageIcon,
            items: [
              {
                title: t('sidebar.topBar'),
                url: '/topbar',
              },
              {
                title: t('sidebar.pageManagement'),
                url: '/pages',
              },
              {
                title: t('sidebar.mediaManagement'),
                url: '/media',
              },
              {
                title: t('sidebar.newsManagement'),
                url: '/news',
              },
            ],
          },
          {
            title: t('sidebar.projectManagement'),
            url: '/projects',
            icon: WorkIcon,
          },
          {
            title: t('sidebar.fatwaManagement'),
            url: '/fatwa',
            icon: DocumentIcon,
          },
          {
            title: t('sidebar.userManagement'),
            url: '/users',
            icon: UsersIcon,
          },
          {
            title: t('sidebar.studentManagement'),
            url: '/students',
            icon: Backpack,
          },
          {
            title: t('sidebar.contactRequests'),
            url: '/contact-requests',
            icon: ChatIcon,
          },
          {
            title: t('sidebar.donationManagement'),
            url: '/donation',
            icon: HandIcon,
          },
          {
            title: t('sidebar.activitiesManagement'),
            url: '/activities',
            icon: LightbulbIcon,
          },
          {
            title: t('sidebar.volunteerManagement'),
            icon: HandIcon,
            items: [
              {
                title: t('sidebar.volunteerCampaigns'),
                url: '/Campaigns',
              },
              {
                title: t('sidebar.volunteerRequests'),
                url: '/Volunteer-requests',
              },
            ],
          },
        ],
      },
      {
        title: t('sidebar.other'),
        items: [
          {
            title: t('sidebar.settings'),
            icon: Settings,
            items: [
              {
                title: t('sidebar.generalSettings'),
                url: '/settings',
              },
              {
                title: t('sidebar.officesBranches'),
                url: '/offices',
              },
              {
                title: t('sidebar.permissions'),
                url: '/roles',
              },
              {
                title: t('sidebar.categoryManagement'),
                url: '/catigories',
              },
            ],
          },
        ],
      },
    ],
  }
}
