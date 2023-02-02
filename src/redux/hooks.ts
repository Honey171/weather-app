import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { TypedUseSelectorHook } from 'react-redux/es/types';
import { useSelector } from 'react-redux/es/exports';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
