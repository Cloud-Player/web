import {Session} from '../session/models/session.model';

let _session: Session = null;

export function setSession(session: Session){
  _session = session;
}

export function getSession(): Session{
  return _session;
}
