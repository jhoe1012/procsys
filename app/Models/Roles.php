<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

class Roles extends Model
{
    use HasFactory;

    protected $fillable = ['namespace', 'name', 'description',];

    public function users()
    {
        return $this->hasManyThrough(
            User::class,
            UserRoleRelation::class,
            'role_id',
            'id',
            'id',
            'user_id',
        );
    }

    public function user()
    {
        return $this->hasMany( User::class );
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany( Permission::class,'role_permissions','role_id');
    }

    public static function namespace( $name )
    {
        return self::where( 'namespace', $name )->first();
    }

    public function addPermissions( $permissions, $silent = false )
    {
        if ( is_string( $permissions ) ) {
            $permission = Permission::namespace( $permissions );

            if ( $permission instanceof Permission ) {
                return self::__createRelation( $this, $permission, $silent );
            }

            throw new Exception( sprintf( __( 'Unable to find the permission with the namespace "%s".' ), $permissions ) );
        } elseif ( $permissions instanceof Collection ) {
            /**
             * looping over provided permissions
             * and attempt to create a relation
             */
            $permissions->each( function ( $permissionNamespace ) {
                $this->addPermissions( $permissionNamespace );
            } );
        } elseif ( is_array( $permissions ) ) {
            /**
             * looping over provided permissions
             * and attempt to create a relation
             */
            collect( $permissions )->each( function ( $permissionNamespace ) {
                $this->addPermissions( $permissionNamespace );
            } );
        } elseif ( $permissions instanceof Permission ) {
            return $this->addPermissions( $permissions->namespace, $silent );
        }
    }

    private static function __createRelation( $role, $permission, $silent = true )
    {
        /**
         * If we want it to be silent
         * then we should'nt trigger any error
         * if the $role is not a valid instance.
         */
        if ( ! $role instanceof Roles && $silent === false ) {
            return; //
        }

        $rolePermission = RolePermission::where( 'role_id', $role->id )
            ->where( 'permission_id', $permission->id )
            ->first();

        /**
         * if the relation already exists, we'll just skip
         * that and proceed
         */
        if ( ! $rolePermission instanceof RolePermission ) {
            $rolePermission = new RolePermission;
            $rolePermission->permission_id = $permission->id;
            $rolePermission->role_id = $role->id;
            $rolePermission->save();
        }
    }

    public function removePermissions( $permissionNamespace )
    {
        if ( $permissionNamespace instanceof Collection ) {
            $permissionNamespace->each( fn( $permission ) => $this->removePermissions( $permission instanceof Permission ? $permission->namespace : $permission ) );
        } else {
            $permission = Permission::where( [ 'namespace' => $permissionNamespace ] )
                ->first();

            if ( $permission instanceof Permission ) {
                RolePermission::where( [
                    'role_id' => $this->id,
                    'permission_id' => $permission->id,
                ] )->delete();
            } else {
                throw new Exception( sprintf(
                    __( 'Unable to remove the permissions "%s". It doesn\'t exists.' ),
                    $permissionNamespace
                ) );
            }
        }
    }

    // Roles::namespace( 'admin' )->addPermissions( $this->permission );
}
