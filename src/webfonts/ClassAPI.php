<?php
use Ntb\RestAPI\BaseRestController;
use SaltedHerring\Debugger;
/**
 * @file ClassAPI.php
 *
 * Controller to present the data from forms.
 * */
class ClassAPI extends BaseRestController
{
    private static $allowed_actions = [
        'post'                  =>  "->isAuthenticated"
    ];

    public function isAuthenticated()
    {
        if ($member = Member::currentUser()) {
            if ($csrf = $this->request->postVar('csrf')) {
                return $csrf    ==  SecurityToken::getSecurityID();
            }
        }

        return false;
    }

    public function post($request)
    {
        return  [
                    'code'      =>  200,
                    'message'   =>  'here'
                ];
    }
}
