export interface RequestStatus {
  pending: boolean
  fulfilled: boolean
  rejected: boolean
}

export const getRequestStatus = (): Record<keyof RequestStatus, RequestStatus> => ({
  pending: {
    pending: true,
    fulfilled: false,
    rejected: false,
  },
  fulfilled: {
    pending: false,
    fulfilled: true,
    rejected: false,
  },
  rejected: {
    pending: false,
    fulfilled: false,
    rejected: true,
  },
})
