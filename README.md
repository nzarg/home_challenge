# Site-Host home_challenge Lucas Boglione

## First

If you are planning to run `playbook.yml` on multiple servers at the same time, I would suggest creating an `SSH key` on your computer (control node) and copying that SSH key into the `Site Host` `Control Panel -> SSH Keys`. This way, when you create those new VPS, you can include those `SHH keys` in your VPS configuration.


You can see all the SSH keys you have on your computer by using the following command:

```bash
$ ls -la ~/.ssh
```


You can view and copy the content of the id_ed25519.pub file using the following command:

```bash
$ cat ~/.ssh/id_ed25519.pub
```


If you want to create a new SSH key on your computer (control node), you can follow these steps, to make it easier for you, I have provided a sample IP (128.128.128.128) in the following commands.

NOTE: Please remember to replace 128.128.128.128 with the actual IP address of the target host.


Generate a key with a passphrase:

```bash
$ ssh-keygen -t ed25519 -C 'user default'
```


Create a key for ansible with no passphrase:

```bash
$ ssh-keygen -t ed25519 -C "ansible"
```


List al your keys:

```bash
$ ls -la ~/.ssh
```


Display the key in the terminal:

```bash
$ cat ~/.ssh/ansible.pub
$ cat ~/.ssh/id_ed25519.pub
```


Just in case you forgot to select to include your SSH key when creating your VPS, these commands are helpful for copying your SSH keys from your computer to the target host.


Copy to Target Host:

```bash
$ ssh-copy-id -i ~/.ssh/id_ed25519.pub 128.128.128.128
```


Copy to Target Host:

```bash
$ ssh-copy-id -i ~/.ssh/ansible.pub 128.128.128.128
```


## Second

To ensure that your control node is up to date, run the command:

```bash
$ ansible-playbook install_on_control_node.yml
```


Please note that this feature has not been tested yet.


## Third and last

Before proceeding, make sure to configure the `inventory` file with the IP addresses where you want to install this software.

Later, you will need to configure your `API_KEY` and add the `IP addresses` to the appropriate section.

Finally, execute the command:

```bash
$ ansible-playbook playbook.yml
```

