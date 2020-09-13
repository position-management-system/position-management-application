import SockJS from 'sockjs-client';

import Stomp from 'webstomp-client';
import { Observable } from 'rxjs';
import { Storage } from 'react-jhipster';

import { ACTION_TYPES as VIEW_ACTIONS } from 'app/modules/view/view.reducer';
import { SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

let stompClient = null;

let subscriber = null;
let connection: Promise<any>;
let connectedPromise: any = null;
let listener: Observable<any>;
let listenerObserver: any;
let alreadyConnectedOnce = false;

const createConnection = (): Promise<any> => new Promise((resolve, reject) => (connectedPromise = resolve));

const createListener = (): Observable<any> =>
  new Observable(observer => {
    listenerObserver = observer;
  });

const subscribe = () => {
  connection.then(() => {
    subscriber = stompClient.subscribe('/topic/positions', data => {
      listenerObserver.next(JSON.parse(data.body));
    });
  });
};

const connect = () => {
  if (connectedPromise !== null || alreadyConnectedOnce) {
    // the connection is already being established
    return;
  }
  connection = createConnection();
  listener = createListener();

  // building absolute path so that websocket doesn't fail when deploying with a context path
  const loc = window.location;
  const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

  const headers = {};
  let url = '//' + loc.host + baseHref + '/websocket/positions';
  const authToken = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (authToken) {
    url += '?access_token=' + authToken;
  }
  const socket = new SockJS(url);
  stompClient = Stomp.over(socket);

  stompClient.connect(headers, () => {
    connectedPromise('success');
    connectedPromise = null;
    subscribe();
    if (!alreadyConnectedOnce) {
      alreadyConnectedOnce = true;
    }
  });
};

const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
    stompClient = null;
  }
  alreadyConnectedOnce = false;
};

const receive = () => listener;

const unsubscribe = () => {
  if (subscriber !== null) {
    subscriber.unsubscribe();
  }
  listener = createListener();
};

export default store => next => action => {
  // if (action.type === SUCCESS(VIEW_ACTIONS.GET_SESSION)) {
  //   connect();
  //   if (!alreadyConnectedOnce) {
  //     receive().subscribe(activity => {
  //       return store.dispatch({
  //         type: VIEW_ACTIONS.WEBSOCKET_POSITION_MESSAGE,
  //         payload: activity,
  //       });
  //     });
  //   }
  // } else if (action.type === FAILURE(VIEW_ACTIONS.GET_SESSION)) {
  //   unsubscribe();
  //   disconnect();
  // }
  connect();
  if (!alreadyConnectedOnce) {
    receive().subscribe(activity => {
      return store.dispatch({
        type: VIEW_ACTIONS.WEBSOCKET_POSITION_MESSAGE,
        payload: activity,
      });
    });
  }
  return next(action);
};
