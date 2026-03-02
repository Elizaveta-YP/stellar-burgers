import { TUser } from '@utils-types';
import reducer, {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser
} from './userSlice';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Test User'
};

interface AuthResponse {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
}

const mockAuthResponse: AuthResponse = {
  success: true,
  user: mockUser,
  accessToken: 'access-token',
  refreshToken: 'refresh-token'
};

describe('userSlice', () => {
  describe('registerUser', () => {
    it('устанавливает isLoading при pending', () => {
      const state = reducer(
        undefined,
        registerUser.pending('', { name: '', email: '', password: '' })
      );
      expect(state.isLoading).toBe(true);
    });

    it('сохраняет данные при fulfilled', () => {
      const state = reducer(
        undefined,
        registerUser.fulfilled(mockAuthResponse, '', { name: '', email: '', password: '' })
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.accessToken).toEqual(mockAuthResponse.accessToken);
      expect(state.refreshToken).toEqual(mockAuthResponse.refreshToken);
    });

    it('сбрасывает isLoading при rejected', () => {
      const state = reducer(
        undefined,
        registerUser.rejected(new Error('Ошибка'), '', { name: '', email: '', password: '' })
      );
      expect(state.isLoading).toBe(false);
    });
  });

  describe('loginUser', () => {
    it('устанавливает isLoading при pending', () => {
      const state = reducer(
        undefined,
        loginUser.pending('', { email: '', password: '' })
      );
      expect(state.isLoading).toBe(true);
    });

    it('сохраняет данные при fulfilled', () => {
      const state = reducer(
        undefined,
        loginUser.fulfilled(mockAuthResponse, '', { email: '', password: '' })
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.accessToken).toEqual(mockAuthResponse.accessToken);
      expect(state.refreshToken).toEqual(mockAuthResponse.refreshToken);
    });

    it('сбрасывает isLoading при rejected', () => {
      const state = reducer(
        undefined,
        loginUser.rejected(new Error('Ошибка'), '', { email: '', password: '' })
      );
      expect(state.isLoading).toBe(false);
    });
  });

  describe('logoutUser', () => {
    it('устанавливает isLoading при pending', () => {
      const state = reducer(undefined, logoutUser.pending('', undefined));
      expect(state.isLoading).toBe(true);
    });

    it('очищает пользователя при fulfilled', () => {
      const filledState = {
        ...reducer(undefined, { type: '' }),
        user: mockUser,
        accessToken: 'token',
        refreshToken: 'refresh'
      };
      const state = reducer(filledState, logoutUser.fulfilled(undefined, ''));
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.accessToken).toBe('token');
      expect(state.refreshToken).toBe('refresh');
    });

    it('сбрасывает isLoading при rejected', () => {
      const state = reducer(
        undefined,
        logoutUser.rejected(new Error('Ошибка'), '', undefined)
      );
      expect(state.isLoading).toBe(false);
    });
  });

  describe('fetchUser', () => {
    it('устанавливает isLoading при pending', () => {
      const state = reducer(undefined, fetchUser.pending('', undefined));
      expect(state.isLoading).toBe(true);
    });

    it('сохраняет пользователя при fulfilled', () => {
      const state = reducer(
        undefined,
        fetchUser.fulfilled(mockUser, '', undefined)
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    it('сбрасывает пользователя и isLoading при rejected', () => {
      const filledState = {
        ...reducer(undefined, { type: '' }),
        user: mockUser
      };
      const state = reducer(
        filledState,
        fetchUser.rejected(new Error('Ошибка'), '', undefined)
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
    });
  });
});