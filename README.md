# Home Challenge: Lucas Boglione

## First - Create SSH Key

If you plan to execute `playbook.yml` on multiple servers simultaneously or for security purposes, I would recommend creating an SSH key on your computer (control node) and copying that SSH key into the **Site Host** control panel's SSH Keys section. By doing this, when you create new VPS instances, you can include those SSH keys in the VPS configuration.


To begin, you can check if you already have SSH keys on your computer.

**List SSH Keys:**

```bash
ls -la ~/.ssh
```


If the previous command prints something like this in the terminal, it means that you will need to create new SSH keys

```
drwx------  14 user  staff   448 28 Jun 22:49 .
drwxr-xr-x+ 41 user  staff  1312 26 Jun 10:19 ..
-rw-------   1 user  staff  1623 28 Jun 22:39 known_hosts
-rw-r--r--   1 user  staff  1273 26 Jun 08:44 known_hosts.old
```


To create a new SSH key on your computer (control node), you can follow the next  steps. 


**Create a key for Ansible:**

```bash
ssh-keygen -t ed25519 -C "ansible"
```
You will be asked for the name of the file type "ansible" and then a passphrase, which you should leave empty.


The next step is optional but highly recommended for security reasons. However, if you wish to connect to the host without a passphrase, you can skip this step.

**Generate another key with a passphrase:**

```bash
ssh-keygen -t ed25519 -C 'user default'
```
You will be asked for the name of the file. You can use the default value, and then provide a passphrase.


**List al your keys:**

```bash
ls -la ~/.ssh
```

The previous command should prints something like this in the terminal now.

```
drwx------  14 user  staff   448 28 Jun 22:49 .
drwxr-xr-x+ 41 user  staff  1312 26 Jun 10:19 ..
-rw-------   1 user  staff   400 26 Jun 08:33 ansible
-rw-r--r--   1 user  staff    90 26 Jun 08:33 ansible.pub
-rw-------   1 user  staff   444 26 Jun 08:31 id_ed25519
-r--------   1 user  staff    95 26 Jun 08:32 id_ed25519.pub
-rw-------   1 user  staff  1623 28 Jun 22:39 known_hosts
-rw-r--r--   1 user  staff  1273 26 Jun 08:44 known_hosts.old
```

**Display the key in the terminal:**

```bash
cat ~/.ssh/ansible.pub
cat ~/.ssh/id_ed25519.pub
```

>
>NOTE: It's really important that you include the .pub extension for security reasons. If you want to know how they work check the following link <a href="https://www.ssh.com/academy/ssh-keys" target="_blank">SSH.COM</a>
>


Copy these values into the <a href="https://cp.sitehost.nz/ssh/list-keys" target="_blank">Site Host -> Control Panel -> SSH Keys</a> and create two different SSH Keys. You can now create the VPS and include these SSH Keys in it.


>
> In case you forgot to select to include your SSH Key when creating your VPS, the following commands are useful for copying your SSH Keys from your computer to the target host.
>
>NOTE: Please replace `128.128.128.128` with the actual IP address of the target host.
>


**Copy to Target Host:**

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub 128.128.128.128
```


**Copy to Target Host:**
```bash
ssh-copy-id -i ~/.ssh/ansible.pub 128.128.128.128
```


## Second - Update your computer

To ensure that your computer (control node) is up to date, run the command:

```bash
ansible-playbook install_on_control_node.yml
```


## Third and last - Configure Ansible

Before proceeding, make sure to configure the `inventory` file with the IP addresses where you want to install this software.

Later, you will need to configure your <a href="https://cp.sitehost.nz/api/list-keys" target="_blank">API_KEY</a> and add the `IP addresses` to the appropriate section.

Finally, execute the command based on your VPS distro:

```bash
ansible-playbook playbook-ubuntu22-04.yml
```
```bash
ansible-playbook playbook-centos7.yml
```
```bash
ansible-playbook playbook-debian11.yml
```