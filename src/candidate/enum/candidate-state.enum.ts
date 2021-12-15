/**
 * @value AWAITING: The candidate is awaiting to start the recruitment
 * @value REJECTED: The candidate was rejected either doesnt accomplish the requirements or fail on the recruitment workflow
 * @value ACCEPTED The candidate passed all stages
 */

export enum CandidateState {
  AWAITING = 'AWAITING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}
