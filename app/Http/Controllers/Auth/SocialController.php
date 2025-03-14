<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Social;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $socialuser = Socialite::driver($provider)->stateless()->user();

            $user = User::where('email', $socialuser->getEmail())->first();
            if (! $user) {
                $user = User::create([
                    'name'     => $socialuser->getName(),
                    'email'    => $socialuser->getEmail(),
                    'password' => Hash::make(Str::random(8)),
                    'position',
                ]);

                $this->_createSocials($user, $socialuser, $provider);
            }
            $socials = Social::where('provider', $provider)->where('user_id', $user->id)->first();
            if (! $socials) {
                $this->_createSocials($user, $socialuser, $provider);
            }

            Auth::login($user);

            return redirect()->route('dashboard');
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()->route(route: 'login');
        }
    }

    private function _createSocials($user, $socialuser, $provider): void
    {
        $user->socials()->create([
            'provider'               => $provider,
            'provider_id'            => $socialuser->getId(),
            'provider_token'         => $socialuser->token,
            'provider_refresh_token' => $socialuser->refreshToken,
        ]);
    }
}
