export interface RequestStatus {
  idle: boolean
  pending: boolean
  fulfilled: boolean
  rejected: boolean
}

export const getRequestStatus = (): Record<keyof RequestStatus, RequestStatus> => ({
  idle: {
    idle: true,
    pending: false,
    fulfilled: false,
    rejected: false,
  },
  pending: {
    idle: false,
    pending: true,
    fulfilled: false,
    rejected: false,
  },
  fulfilled: {
    idle: false,
    pending: false,
    fulfilled: true,
    rejected: false,
  },
  rejected: {
    idle: false,
    pending: false,
    fulfilled: false,
    rejected: true,
  },
})
