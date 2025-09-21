import * as React from 'react'
import { IconType } from '../../types/icon'

// Import icons from various react-icons libraries
import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowUp,
  HiArrowDown,
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
  HiChevronDown,
  HiArrowDownTray,
  HiArrowUpTray,
  HiDocumentDuplicate,
  HiTrash,
  HiPencil,
  HiBookmark,
  HiMagnifyingGlass,
  HiFunnel,
  HiBars3BottomLeft,
  HiArrowPath,
  HiXMark,
  HiBars3,
  HiEllipsisHorizontal,
  HiCog6Tooth,
  HiInformationCircle,
  HiExclamationTriangle,
  HiXCircle,
  HiCheckCircle,
  HiQuestionMarkCircle,
  HiEye,
  HiEyeSlash,
  HiDocument,
  HiFolder,
  HiPhoto,
  HiDocumentText,
  HiPlayCircle,
  HiSpeakerWave,
  HiLink,
  HiUser,
  HiUsers,
  HiUserCircle,
  HiHeart,
  HiStar,
  HiShare,
  HiEnvelope,
  HiPhone,
  HiChatBubbleLeft,
  HiBell,
  HiCheck,
  HiPlus,
  HiMinus,
  HiArrowPathRoundedSquare,
  HiLockClosed,
  HiLockOpen,
  HiSquares2X2,
  HiListBullet,
  HiCalendarDays,
  HiClock,
} from 'react-icons/hi2'

import {
  FaCode,
  FaTerminal,
  FaBug,
  FaDatabase,
  FaDollarSign,
} from 'react-icons/fa6'

import {
  RxFontSize,
} from 'react-icons/rx'

// Icon registry that maps IconType enum to React components
export const iconRegistry: Record<IconType, React.ComponentType<any>> = {
  // Navigation
  [IconType.ARROW_LEFT]: HiArrowLeft,
  [IconType.ARROW_RIGHT]: HiArrowRight,
  [IconType.ARROW_UP]: HiArrowUp,
  [IconType.ARROW_DOWN]: HiArrowDown,
  [IconType.CHEVRON_LEFT]: HiChevronLeft,
  [IconType.CHEVRON_RIGHT]: HiChevronRight,
  [IconType.CHEVRON_UP]: HiChevronUp,
  [IconType.CHEVRON_DOWN]: HiChevronDown,

  // Actions
  [IconType.DOWNLOAD]: HiArrowDownTray,
  [IconType.UPLOAD]: HiArrowUpTray,
  [IconType.COPY]: HiDocumentDuplicate,
  [IconType.DELETE]: HiTrash,
  [IconType.EDIT]: HiPencil,
  [IconType.SAVE]: HiBookmark,
  [IconType.SEARCH]: HiMagnifyingGlass,
  [IconType.FILTER]: HiFunnel,
  [IconType.SORT]: HiBars3BottomLeft,
  [IconType.REFRESH]: HiArrowPath,

  // Interface
  [IconType.CLOSE]: HiXMark,
  [IconType.MENU]: HiBars3,
  [IconType.MORE]: HiEllipsisHorizontal,
  [IconType.SETTINGS]: HiCog6Tooth,
  [IconType.INFO]: HiInformationCircle,
  [IconType.WARNING]: HiExclamationTriangle,
  [IconType.ERROR]: HiXCircle,
  [IconType.SUCCESS]: HiCheckCircle,
  [IconType.HELP]: HiQuestionMarkCircle,
  [IconType.QUESTION]: HiQuestionMarkCircle,
  [IconType.EYE]: HiEye,
  [IconType.EYE_OFF]: HiEyeSlash,

  // Content
  [IconType.FILE]: HiDocument,
  [IconType.FOLDER]: HiFolder,
  [IconType.IMAGE]: HiPhoto,
  [IconType.DOCUMENT]: HiDocumentText,
  [IconType.FILE_TEXT]: HiDocumentText,
  [IconType.VIDEO]: HiPlayCircle,
  [IconType.AUDIO]: HiSpeakerWave,
  [IconType.MUSIC]: HiSpeakerWave,
  [IconType.LINK]: HiLink,

  // User & Social
  [IconType.USER]: HiUser,
  [IconType.USERS]: HiUsers,
  [IconType.PROFILE]: HiUserCircle,
  [IconType.HEART]: HiHeart,
  [IconType.STAR]: HiStar,
  [IconType.SHARE]: HiShare,

  // Communication
  [IconType.MAIL]: HiEnvelope,
  [IconType.PHONE]: HiPhone,
  [IconType.MESSAGE]: HiChatBubbleLeft,
  [IconType.NOTIFICATION]: HiBell,
  [IconType.BELL]: HiBell,

  // Status
  [IconType.CHECK]: HiCheck,
  [IconType.PLUS]: HiPlus,
  [IconType.MINUS]: HiMinus,
  [IconType.LOADING]: HiArrowPathRoundedSquare,
  [IconType.LOCK]: HiLockClosed,
  [IconType.UNLOCK]: HiLockOpen,

  // Layout
  [IconType.GRID]: HiSquares2X2,
  [IconType.LIST]: HiListBullet,
  [IconType.CALENDAR]: HiCalendarDays,
  [IconType.CLOCK]: HiClock,

  // Development
  [IconType.CODE]: FaCode,
  [IconType.TERMINAL]: FaTerminal,
  [IconType.BUG]: FaBug,
  [IconType.DATABASE]: FaDatabase,

  // Financial & Measurement
  [IconType.DOLLAR]: FaDollarSign,
  [IconType.SCALE]: RxFontSize,
}

// Export a list of all available icons for documentation/selection purposes
export const availableIcons = Object.values(IconType) as IconType[]

// Helper function to get icon component by type
export const getIconComponent = (type: IconType): React.ComponentType<any> => {
  const IconComponent = iconRegistry[type]

  if (!IconComponent) {
    console.warn(`Icon type "${type}" not found in registry. Available types:`, Object.keys(iconRegistry))
    // Return a fallback icon or empty component
    return () => <span>?</span>
  }
  return IconComponent
}
